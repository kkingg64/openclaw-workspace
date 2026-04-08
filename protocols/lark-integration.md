# Lark Integration Protocol (v1.0)

> **Effective:** 2026-04-08  
> **Supersedes:** Local-only document storage

---

## 1. Core Rule

**所有項目文檔標配存放位置：Lark（雲端）。**

- 項目文檔完成後 → **立即上傳至 Lark**
- 本地 workspace 只留**工作副本**（working draft）
- 所有 Agent 優先從 **Lark 讀取**最新版本

---

## 2. Lark Folder Structure

每個項目喺 Lark 有一個 folder：

```
MARHORSE (root folder)
└── P2026-XXX_ProjectName/     ← 每個項目一個 sub-folder
    ├── Phase0_Registration/
    ├── Phase1_Research/
    ├── Phase2_Design/
    ├── Phase3_TechSpec/
    ├── Phase4_Implementation/
    ├── Phase4_5_DeployVerification/
    ├── Phase5_UAT/
    ├── Phase6_Closeout/
    ├── meeting-minutes/
    └── backlog/
```

**Current P2026-008 Lark Folder:**
- URL: `https://pjpy0fiseu4d.jp.larksuite.com/drive/folder/QDYZf065MlXIlzdnHtKjOLrHpHf`
- Folder Token: `QDYZf065MlXIlzdnHtKjOLrHpHf`

---

## 3. Lark API Credentials

| Field | Value |
|-------|-------|
| App ID | `cli_a95c823ffb78de17` |
| App Secret | `tFO2j5wUmwh73hUJvwXWshBCzKX0JUSO` |
| Upload Endpoint | `POST /open-apis/drive/v1/files/upload_all` |
| Create Folder | `POST /open-apis/drive/v1/files/create_folder` |

**Auth:** `POST /open-apis/auth/v3/tenant_access_token/internal`

---

## 4. Document Upload SOP

### Step 1: Get Token
```python
resp = requests.post("https://open.larksuite.com/open-apis/auth/v3/tenant_access_token/internal",
    json={"app_id": APP_ID, "app_secret": APP_SECRET})
token = resp.json()["tenant_access_token"]
```

### Step 2: Upload
```python
with open(file_path, 'rb') as f:
    files = {'file': (filename, f, 'text/markdown')}
    data = {
        'file_name': filename,
        'parent_type': 'explorer',
        'parent_node': FOLDER_TOKEN,  # e.g. "QDYZf065MlXIlzdnHtKjOLrHpHf"
        'size': str(file_size),
    }
    resp = requests.post(URL, headers={"Authorization": f"Bearer {token}"}, data=data, files=files)
```

### Step 3: Verify
- HTTP 200 + `"code":0` = 成功
- 403 = App 未有 folder 權限（需要擁有者分享 folder）

---

## 5. Agent Workflow

| Trigger | Action |
|---------|--------|
| 完成 Phase 文檔 | 上傳至 Lark folder |
| 需要讀取文檔 | 從 Lark 讀取（通過 web_fetch 或 API） |
| Boss 要求查看 | 提供 Lark link |
| 新項目啟動 | 在 Lark MARHORSE folder 下創建項目 sub-folder |

---

## 6. Cleanup Rules

- **所有臨時測試文件**（`.py`, `.js`, `.sh`, `.ts`, `.tsx` 等）→ **工作完成後立即刪除**
- **截圖**（`.png` 等）→ 上傳至 Lark 後刪除本地副本
- **/tmp 目錄** → 每次上傳完成後清理
- **嚴禁**將調試脚本留在 workspace 或 /tmp

```bash
# 完成後必清
rm -f /tmp/*.py /tmp/*.js /tmp/*.sh /tmp/*.png
```

## 7. Exceptions

- **代碼文件**（.ts, .tsx, .css）：仍然存喺 workspace `projects/` directory
- **敏感資訊**（credentials, .env）：**永不**上傳至 Lark
- **大型 binary 文件**（>50MB）：唔適合 Lark，改用其他方式

---

## 8. Compliance

所有 Agent 必須遵守：
- ✅ 文檔完成後立即上傳 Lark
- ✅ Agent 間共享文檔用 Lark link
- ✅ 本地 workspace 只留 working draft
- ✅ 臨時測試文件用完即刪
- ❌ 唔可以只用本地文件而唔上傳 Lark
- ❌ 唔可以留低調試脚本（.py/.js/.sh）
