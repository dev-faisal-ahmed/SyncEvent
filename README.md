# SyncEvent

## About This Project.

This is a simple event management API, Here an user can create an event, by giving basic information of an event including participant.

## How Run This Project Locally?

To run this project locally please do followings,

- Clone this github repository
- After that please install the dependencies
- Please create an `.env` file in the root folder

```ts
DATABASE_URL =
  'postgresql://postgres.xsydjbqetchddjrfeybp:hiEvent124MeHo@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres';
PORT = '5000';
NODE_ENV = 'development';
```

- Once you are done please run `npm run dev` command to the terminal and you are good to go🚀.

## Api Endpoints

### Create Event

```ts
METHOD: 'POST';
URL: 'https://sync-event.vercel.app/api/v1/events';

BODY: {
  name: '';
  date: 'YYYY-MM-DD';
  startTime: 'HH:MM'; // please use 24 hours formate
  endTime: 'HH:MM'; // please use 24 hours formate
  location: '';
  description: '';
  participants: [''];
}
```

### Get Events

```ts
METHOD: 'GET';
URL: 'https://sync-event.vercel.app/api/v1/events';
```

### Get Event By Id

```ts
METHOD: 'GET';
URL: 'https://sync-event.vercel.app/api/v1/events/:id';
```

### Update Event By Id

```ts
METHOD: 'PUT';
URL: 'https://sync-event.vercel.app/api/v1/events/:id';
BODY: {
  name?: '';
  date?: 'YYYY-MM-DD';
  startTime?: 'HH:MM'; // please use 24 hours formate
  endTime?: 'HH:MM'; // please use 24 hours formate
  location?: '';
  description?: '';
}
```

### Delete Event By Id

```ts
METHOD: 'DELETE';
URL: 'https://sync-event.vercel.app/api/v1/events/:id';
```

### Add Participants

```ts
METHOD: 'DELETE';
URL: 'https://sync-event.vercel.app/api/v1/events/:id/participants';
BODY: {
  participants: [''];
}
```

### Delete Participant

```ts
METHOD: 'DELETE';
URL: 'https://sync-event.vercel.app/api/v1/events/:id/participants/:participantId';
```
