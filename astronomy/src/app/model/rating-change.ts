import { AstronomyEvent } from './event';

export interface EventRatingChange {
    event: AstronomyEvent,
    changeInRating: number;
}