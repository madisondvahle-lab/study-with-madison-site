# Study With Madison RN: AI Agent Instructions

Read this file before making changes.

## Project purpose
This repository is the public Study With Madison RN website.

It contains the public-facing business site, tutoring information, services/packages, landing pages, blog content, SEO/public marketing content, and links into the separate NCLEX Success Center.

This is NOT the private NCLEX Success Center application.

Private student dashboards, NCLEX modules, CAT/readiness assessments, student progress, question-bank administration, module assignments, and Supabase student/admin tooling belong in the separate repository `madisondvahle-lab/nclex-success-center`.

## Before working
1. Read `.agents/PROJECT.md` when architecture or cross-repository boundaries are relevant.
2. Inspect current files before relying on historical commits or generic starter documentation.
3. Keep changes tightly scoped to the requested task.

## Critical rules
- Do not add private student records, dashboards, assessments, question-bank admin tools, or student-specific Supabase workflows to this repository.
- Do not duplicate NCLEX Success Center functionality here.
- Public blog posts, service/package content, marketing pages, SEO, and general business content belong here.
- Links to the NCLEX Success Center should point to the separate deployed Success Center rather than rebuilding its private functionality in this repo.
- Preserve the current site stack and patterns unless a task explicitly authorizes an architectural change.
- Do not infer project purpose from the generic starter README alone.
- When a request could belong to either repository, determine whether it is public marketing/business content or private student/NCLEX application functionality before editing.

## Cross-repository boundary
Use this repository for PUBLIC Study With Madison content.
Use `madisondvahle-lab/nclex-success-center` for PRIVATE NCLEX Success Center functionality.

If a task clearly belongs in the other repository, stop and document that rather than implementing it in the wrong place.
