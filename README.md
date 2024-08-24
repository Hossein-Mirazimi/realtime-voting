# Real-Time Voting App

This is a real-time voting application where users can propose topics and vote on them in real-time. The application utilizes Redis and Socket.IO to ensure all connected clients are instantly updated with the latest voting data.

## Features

- **Real-Time Voting:** Users can propose topics, vote on them, and see the results update in real-time.
- **Socket.IO Integration:** Clients are notified immediately when new topics are added or votes are cast.
- **Redis:** Used as the main data store to track votes and topics, with Upstash serving as the Redis hosting platform.
- **Separation of Concerns:** The project is structured with two distinct folders:
  - **Client:** Built using Next.js 14 and ShadCN-UI.
  - **Server:** A Node.js Express server that manages the backend API and handles socket communication.

## Project Structure

```plaintext
root/
├── client/
│   ├── app/
│   ├── components/
│   ├── utils/
│   ├── bun.lockb
│   ├── package.json
│   └── ...
└── server/
    ├── index.ts
    ├── bun.lockb
    ├── package.json
    └── ...
```

- **`client/`:** This folder contains the frontend part of the application.

  - Built with [Next.js 14](https://nextjs.org/).
  - Uses [ShadCN-UI](https://ui.shadcn.dev/) for consistent and easy-to-use UI components.
  - Connects to the backend through API calls and listens for real-time updates using Socket.IO.

- **`server/`:** This folder contains the backend part of the application.
  - Built with [Node.js](https://nodejs.org/) and [Express.js](https://expressjs.com/).
  - Uses [Socket.IO](https://socket.io/) for real-time communication between the server and the client.
  - Stores voting data in Redis, hosted by [Upstash](https://upstash.com/).

## Technologies Used

### Client-Side

- **Next.js 14**
- **ShadCN-UI**
- **Redis** (for client-side state management)

### Server-Side

- **Node.js**
- **Express.js**
- **Socket.IO**
- **Redis** (for real-time data storage and pub/sub functionality)

### Other

- **Upstash Redis:** Hosted Redis service that powers real-time updates and state management for both client and server.

## Prerequisites

- **Bun**: Ensure that you have Bun installed. You can install it by running:

  ```bash
  curl -fsSL https://bun.sh/install | bash
  ```

```

```

- **Redis Upstash Account**: You need an Upstash Redis account. You can sign up here.

## Getting Started

### Client Setup

1. Navigate to the `client` directory:

```bash
cd client
```

2. Install the dependencies using Bun:

```bash
bun install
```

3. Configure the environment variables:

- Create a `.env.local` file in the `client` folder with the following content:

```env
NEXT_PUBLIC_UPSTASH_REDIS_REST_URL=<YOUR_UPSTASH_REDIS_REST_URL>
NEXT_PUBLIC_UPSTASH_REDIS_REST_TOKEN=<YOUR_UPSTASH_REDIS_REST_TOKEN>
NEXT_PUBLIC_SOCKET_SERVER_URL=<YOUR_SERVER_URL>
```

4. Start the development server:

```bash
bun dev
```

The client will be running at `http://localhost:3000`.

### Server Setup

1. Navigate to the `server` directory:

```bash
cd server
```

2. Install the dependencies using Bun:

```bash
bun install
```

3. Configure the environment variables:

- Create a `.env` file in the `server` folder with the following content:

```env
REDIS_CONNECTION_STRING=<YOUR_UPSTASH_REDIS_CONNECTION_STRING>
SOCKET_PORT=<YOUR_SOCKET_PORT>
```

4. Start the server:

```bash
bun start
```

The server will be running on the port specified in your `.env` file.

## Usage

1. Visit the frontend at `http://localhost:3000`.
2. Create a new topic or vote on an existing one.
3. All clients connected to the application will receive real-time updates as votes are cast or new topics are created.
4. You can open multiple browser windows to test the real-time functionality. Whenever you vote in one window, the updates will be reflected in all other connected windows in real-time.

## Deployment

### Client-Side

The frontend can be deployed on any platform that supports Next.js application, such as [Vercel](https://vercel.com/), [Netlify](https://www.netlify.com/), or similar services.

### Server-Side

The backend can be deployed on platforms like [Heroku](https://www.heroku.com/), [Railway](https://railway.app/), or [Vercel](https://vercel.com/).

Make sure to adjust the environment variables to reflect your production URLs and settings when deploying.

## Contributing

Contributing are welcome! Feel free to submit a pull request, or open an issue on discuss potential changes or new features.

## License

This project is licensed under MIT License - see the [LICENSE]() file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [ShadCN-UI](https://ui.shadcn.dev/)
- [Socket.IO](https://socket.io/)
- [Upstash](https://upstash.com/)
- [Bun](https://bun.sh/)
