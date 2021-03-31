<p align="center">
  <a href="https://f-st.ga/">
    <h1 align="center">F-ST</h1>
  </a>
  <p align="center">Open source URL shortner</p>
</p>

## Getting Started

**Prerequisites**

- Docker
- docker-compose
- Open port 80 and 443

Edit `docker-compose.yml` to suite your needs (i.e:- domain name config for [Traefik](https://github.com/traefik/traefik)).

Run the app:

```
docker-compose up -d
```

## Configuration

For development edit `.env.development` and production edit `.env.production` for production. Avaiable options:

- `API_ROOT` Backend API Base URL (eg:- https://f-st.ga/jpIo4W)
- `REDIS_HOST` Redis hostname (eg:- db for docker or IP)
