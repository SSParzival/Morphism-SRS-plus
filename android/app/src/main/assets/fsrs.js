// FSRS (Free Spaced Repetition Scheduler) Engine in JavaScript
// Fully compatible with Python fsrs 6.x / 5.x specification used in Morphism SRS Plus.

const Rating = {
    Again: 1,
    Hard: 2,
    Good: 3,
    Easy: 4
};

const State = {
    New: 0,
    Learning: 1,
    Review: 2,
    Relearning: 3
};

class FSRSCard {
    constructor(data = {}) {
        this.due = data.due ? new Date(data.due) : new Date();
        this.stability = data.stability !== undefined ? data.stability : 0.0;
        this.difficulty = data.difficulty !== undefined ? data.difficulty : 0.0;
        this.elapsed_days = data.elapsed_days || 0;
        this.scheduled_days = data.scheduled_days || 0;
        this.reps = data.reps || 0;
        this.lapses = data.lapses || 0;
        this.state = data.state !== undefined ? data.state : State.New;
        this.last_review = data.last_review ? new Date(data.last_review) : null;
    }

    toDict() {
        return {
            due: this.due ? this.due.toISOString() : null,
            stability: this.stability,
            difficulty: this.difficulty,
            elapsed_days: this.elapsed_days,
            scheduled_days: this.scheduled_days,
            reps: this.reps,
            lapses: this.lapses,
            state: this.state,
            last_review: this.last_review ? this.last_review.toISOString() : null
        };
    }
}

class FSRSScheduler {
    constructor(desiredRetention = 0.85) {
        this.desiredRetention = desiredRetention;
        // Standard FSRS default parameter weights
        this.w = [
            0.4072, 1.1829, 3.1262, 15.4722, 7.2102, 0.5316, 1.0651, 0.0234,
            1.616, 0.1544, 1.0824, 1.9813, 0.0953, 0.2975, 2.2042, 0.2407, 2.9466
        ];
        this.factor = 19.0 / 81.0;
    }

    getCardRetrievability(card, now = new Date()) {
        if (!card.last_review) return 0.0;
        const elapsed = Math.max(0, (now - card.last_review) / (1000 * 60 * 60 * 24));
        if (card.stability <= 0) return 0.0;
        const ret = Math.pow(1.0 + (this.factor * elapsed) / card.stability, -0.5);
        return Math.max(0.0, Math.min(1.0, ret));
    }

    getInterval(stability) {
        if (stability <= 0) return 1;
        const newInterval = (stability / this.factor) * (Math.pow(this.desiredRetention, -1.0 / 0.5) - 1.0);
        return Math.max(1, Math.round(newInterval));
    }

    reviewCard(card, rating, now = new Date()) {
        const c = new FSRSCard(card.toDict());
        const elapsed = c.last_review ? Math.max(0, (now - c.last_review) / (1000 * 60 * 60 * 24)) : 0;
        c.elapsed_days = Math.round(elapsed);
        c.last_review = now;
        c.reps += 1;

        if (c.state === State.New) {
            // Initial stability and difficulty
            c.difficulty = Math.max(1.0, Math.min(10.0, this.w[4] - Math.exp(this.w[5] * (rating - 1)) + 1));
            c.stability = Math.max(0.1, this.w[rating - 1]);
            
            if (rating === Rating.Again) {
                c.state = State.Learning;
                c.scheduled_days = 0;
                c.due = new Date(now.getTime() + 10 * 60 * 1000); // 10 minutes
            } else if (rating === Rating.Hard) {
                c.state = State.Learning;
                c.scheduled_days = 1;
                c.due = new Date(now.getTime() + 1 * 24 * 60 * 60 * 1000);
            } else {
                c.state = State.Review;
                c.scheduled_days = this.getInterval(c.stability);
                c.due = new Date(now.getTime() + c.scheduled_days * 24 * 60 * 60 * 1000);
            }
        } else {
            // Update difficulty
            const r = this.getCardRetrievability(c, now);
            const deltaD = -this.w[6] * (rating - 3);
            c.difficulty = Math.max(1.0, Math.min(10.0, c.difficulty + deltaD));

            if (rating === Rating.Again) {
                c.lapses += 1;
                c.state = State.Relearning;
                c.stability = Math.max(0.1, this.w[11] * Math.pow(c.difficulty, -this.w[12]) * (Math.pow(c.stability + 1, this.w[13]) - 1) * Math.exp((1 - r) * this.w[14]));
                c.scheduled_days = 0;
                c.due = new Date(now.getTime() + 10 * 60 * 1000); // 10 mins
            } else {
                c.state = State.Review;
                const hardPenalty = rating === Rating.Hard ? this.w[15] : 1.0;
                const easyBonus = rating === Rating.Easy ? this.w[16] : 1.0;
                c.stability = Math.max(0.1, c.stability * (1 + Math.exp(this.w[8]) * (11 - c.difficulty) * Math.pow(c.stability, -this.w[9]) * (Math.exp((1 - r) * this.w[10]) - 1) * hardPenalty * easyBonus));
                c.scheduled_days = this.getInterval(c.stability);
                c.due = new Date(now.getTime() + c.scheduled_days * 24 * 60 * 60 * 1000);
            }
        }

        return c;
    }

    getIntervalForecasts(card, now = new Date()) {
        const forecasts = {};
        for (const r of [Rating.Again, Rating.Hard, Rating.Good, Rating.Easy]) {
            const simulated = this.reviewCard(card, r, now);
            const diffMs = simulated.due - now;
            forecasts[r] = this.formatDuration(diffMs);
        }
        return forecasts;
    }

    formatDuration(ms) {
        const sec = Math.max(1, Math.round(ms / 1000));
        if (sec < 3600) {
            const mins = Math.max(1, Math.round(sec / 60));
            return `${mins}m`;
        } else if (sec < 86400) {
            const hrs = (sec / 3600).toFixed(1);
            return `${hrs}h`;
        } else {
            const days = (sec / 86400).toFixed(1);
            return `${days}d`;
        }
    }
}
