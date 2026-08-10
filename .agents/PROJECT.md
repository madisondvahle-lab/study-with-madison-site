# Study With Madison RN Public Website Context

## Repository role
This repository is the public business/marketing website for Study With Madison RN.

### Belongs here
- public home/landing pages
- tutoring services and package information
- free consultation and booking calls to action
- public blog posts and educational marketing content
- testimonials and public business credibility content
- public-facing brand/design work
- SEO, metadata, and public navigation
- links to public readiness tools or private student sign-in hosted by the separate NCLEX Success Center

### Does not belong here
- private student dashboards
- student records or individualized study plans
- NCLEX module assignment logic
- adaptive CAT/readiness engine implementation
- private assessment-history uploads or trend analysis
- question-bank administration
- Supabase student/admin authorization or Row Level Security for the Success Center
- tutor-only NCLEX administration tools

Those belong in `madisondvahle-lab/nclex-success-center`.

## Current technical stack
The site uses React 19 + TypeScript with vinext/Cloudflare tooling. Follow current project patterns rather than replacing the stack unless an architectural migration is explicitly requested.

Inspect `package.json`, current routes/components, and deployed patterns before introducing new dependencies or frameworks.

## Cross-repository links
The public website may link to the NCLEX Success Center for readiness checks and secure student sign-in. Linking is appropriate; duplicating the private application in this repository is not.

## Content placement rule
Before creating a new page or feature, classify it:

- Public business/marketing/SEO/blog content -> this repository.
- Private student/NCLEX application/admin functionality -> `nclex-success-center`.

This rule exists because prior AI work accidentally added public blog content to the private Success Center repository.

## Change strategy
For substantial work:
1. identify the requested public outcome
2. inspect the current route/component that owns it
3. reuse existing design/brand patterns
4. avoid unnecessary framework/dependency changes
5. verify links to external booking/Success Center destinations
6. keep private NCLEX application logic out of this codebase
