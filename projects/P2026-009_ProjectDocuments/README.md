# PROJECT_TEMPLATE

> Copy this directory to `projects/{PROJECT_ID}_ProjectDocuments/` when a new project is approved.

## 1. After Copying

Replace all placeholders:

- `{PROJECT_ID}`
- `{PROJECT_NAME}`
- `{CODE_NAME}`
- `YYYY-MM-DD HH:MM HKT`

## 2. Minimum Setup Steps

1. Rename this root directory to `projects/{PROJECT_ID}_ProjectDocuments/`
2. Fill `PROJECT.json`
3. Update this README with real project links and owners
4. Create the matching code path `projects/{PROJECT_ID}_{CODE_NAME}/`
5. Start Phase 0 in `documents/Phase0_Registration/`

## 3. Standard Structure

```text
{PROJECT_ID}_ProjectDocuments/
├── PROJECT.json
├── README.md
├── backlog/
│   └── ENHANCEMENT_BACKLOG.md
├── documents/
│   ├── Phase0_Registration/
│   ├── Phase1_Research/
│   ├── Phase2_Design/
│   ├── Phase3_TechSpec/
│   ├── Phase4_Implementation/
│   ├── Phase4_5_DeployVerification/
│   ├── Phase5_UAT/
│   └── Phase6_Closeout/
└── figma/
```

## 4. Required Naming Convention

Use these file names inside the phase folders. Template files (prefixed `TEMPLATE_`) are provided for key artefacts — copy and rename them:

- `{PROJECT_ID}_Project_Registration.md` ← from `TEMPLATE_Project_Registration.md`
- `{PROJECT_ID}_Research.md`
- `{PROJECT_ID}_UI_Spec.md`
- `{PROJECT_ID}_UAT_Test_Case.md`
- `{PROJECT_ID}_Technical_Spec.md` ← from `TEMPLATE_Technical_Spec.md`
- `{PROJECT_ID}_Version_and_Bug_List.md`
- `{PROJECT_ID}_DeployVerification.md`
- `{PROJECT_ID}_UAT_Test_Result.md` ← from `TEMPLATE_UAT_Test_Result.md`
- `{PROJECT_ID}_Closeout.md` ← from `TEMPLATE_Closeout.md`

## 5. Verification Files

Use the verification toolkit for:

- `{PROJECT_ID}_MultiModel_Review_1.md`
- `{PROJECT_ID}_MultiModel_Review_2.md`
- `{PROJECT_ID}_Gate_Check.log`

## 6. Project Summary

- Project ID: `{PROJECT_ID}`
- Project Name: `{PROJECT_NAME}`
- Code Name: `{CODE_NAME}`
- Owner: `TBD`
- Current Phase: `0`
- Status: `REGISTERED`

## 7. Links

- Code path: `projects/{PROJECT_ID}_{CODE_NAME}/`
- Docs path: `projects/{PROJECT_ID}_ProjectDocuments/`
- Register entry: `PROJECT_REGISTER.md`
- Current phase control: `PHASE_STATUS.md`