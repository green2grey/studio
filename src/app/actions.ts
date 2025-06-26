'use server';

import { getPersonalizedMotivation, PersonalizedMotivationInput } from '@/ai/flows/personalized-motivation';

export async function getMotivationAction(input: PersonalizedMotivationInput) {
    try {
        const motivation = await getPersonalizedMotivation(input);
        return { success: true, data: motivation };
    } catch (error) {
        console.error('Error fetching personalized motivation:', error);
        return { success: false, error: 'Failed to get personalized motivation. Please try again later.' };
    }
}
