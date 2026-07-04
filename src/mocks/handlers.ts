import { http, HttpResponse } from 'msw';
import { mockMails } from './mails';

export const handlers = [
  http.get('/api/mails', () => {
    return HttpResponse.json(mockMails);
  }),
];
