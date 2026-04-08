# ENV_SETUP_GUIDE.md

> Secret and environment management standard for all MADHORSE projects.

## 1. Rules

1. Never commit `.env` files.
2. Always commit `.env.example` for every runnable project.
3. Keep production secrets out of markdown docs.
4. Only `NEXT_PUBLIC_*` variables may be exposed to the browser.
5. Secret values belong in the runtime environment, not in `PROJECT.json` or tickets.

## 2. Required Files For New Projects

- `.env.example`
- local `.env`
- environment section in project README describing required variables
- deploy notes describing where production values are stored

## 3. Naming Convention

Use descriptive names:

- `APP_ENV`
- `APP_URL`
- `DATABASE_URL`
- `REDIS_URL`
- `MINIMAX_API_KEY`
- `FIGMA_TOKEN`
- `HOSTINGER_API_TOKEN`

Do not create ambiguous names such as `SECRET1`, `TOKEN2`, or `KEY`.

## 4. Bootstrap Workflow

1. Copy `.env.example` to `.env`
2. Fill values from secure source
3. Validate the app boots locally
4. Confirm only browser-safe vars are prefixed with `NEXT_PUBLIC_`
5. Document any non-obvious variables in README

## 5. Example Skeleton For App Projects

```dotenv
APP_ENV=development
APP_URL=http://localhost:3000
DATABASE_URL=
REDIS_URL=
MINIMAX_API_KEY=
```

## 6. Environment Separation

Maintain separate values for:

- local development
- staging / preview
- production

Do not reuse production secrets in local development unless there is no safer alternative.

## 7. Rotation Policy

Rotate immediately after:

- suspected leakage
- offboarding of a privileged operator
- third-party compromise
- major production incident involving auth or secrets

## 8. Legacy Remediation Rule

Some existing projects currently have `.env` without `.env.example`. Before the next major release of any such project:

- create `.env.example`
- remove secret values from any markdown references
- document runtime requirements

## 9. Review Checklist

- [ ] `.env` ignored
- [ ] `.env.example` present
- [ ] production values not in repo
- [ ] names are descriptive
- [ ] browser variables explicitly marked