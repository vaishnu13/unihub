import { config } from 'dotenv';
config();

import '@/ai/flows/calculate-hireability-score.ts';
import '@/ai/flows/answer-student-questions.ts';
import '@/ai/flows/generate-personalized-learning-path.ts';
import '@/ai/flows/recommend-relevant-internships.ts';