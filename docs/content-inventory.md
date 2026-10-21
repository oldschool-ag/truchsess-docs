# Content inventory

What an administrator or a member of a Truchsess box can see and do, read from the Truchsess
source. Every page of the manual is written from this list. When the box changes, this list
changes first, then the pages.

## How this list was made

- **Checked against (docs part 7):** release **Truchsess 2026.10.21-84a4137** (`truchsess-iso-20261021-84a4137`,
  source commit `84a4137`, equal to master). Every change since 9 October is in section 25, which
  wins where it disagrees with an older section. Before that: box release `truchsess-iso-20261009-f38e791` (published 2026-10-09, source commit
  `f38e791`) for the Agents page in three parts (T38, PR #76) and products rename, archive and
  restore (T48, PR #75). Box release `truchsess-iso-20261009-8551c68` (published 2026-10-09,
  source commit `8551c68`) for the office address (T43, PR #70); it adds nothing else people see except an
  operator-only ChatGPT option (T46, PR #74), which stays out of the manual. Box release
  `truchsess-iso-20261009-da06988` (published 2026-10-09, source commit `da06988`) for
  the portal structure, the activation and the managed AI; release
  `truchsess-iso-20261008-c7fabcd` (published 2026-10-08) for the phone and voice input (T20, PR
  #63) and the permission check on updates (T44, PR #72). Since `c7fabcd`, `da06988` adds the
  new portal look and structure (T40, PR #73: section 21 maps every old place to its new place)
  and the first run with an activation code, managed AI and starter credit (T42, PR #68:
  section 22). Sections 1 to 14 still name the places as they were before T40; section 21 is
  the key to read them. `ac837a8` added people and accounts (T35), store takeover and the
  period end (T39b), downloads through the page (T37) and refused uploads in words (T41);
  `1b70539` fixed "duplicate permission" (T39), `12b3acf` added hand-offs (section 18),
  `f1af221` the five autonomy levels (section 17), `f6fb33a` Knowledge; `19aad3e` has
  everything else.
- **Sources read:** the portal page (markup and script), the portal server (routes and
  messages), the modules behind it (accounts, packages, connections, data rule, budget, backups,
  remote access, system update, work chat), the installer's setup page and scripts, the
  permission vocabulary, and the matching design notes in the Truchsess repository. Where a
  note and the code disagree, the code wins.
- **Office address (T43, PR #70, release `8551c68`):** the manual says `https://truchsess.local/`,
  with `myai.local` still working. Strings checked on master: installer "Truchsess setup",
  setup Wi-Fi `Truchsess-Setup-` plus six characters, console "Office address: https://truchsess.local/
  (myai.local works too)", "Certificate fingerprint of this Truchsess", update outcome "The office
  address is now truchsess.local; myai.local still works. ...". T15a (PR #71) is design notes only.
- **Who sees it:** "Admin" is the CEO administrator (the first account; the portal calls it
  "CEO administrator"). "Member" is every other account. There are no other roles.
- **Undo:** "Yes" means the person can reverse it in the portal. "No" means it cannot be
  reversed. "Partly" says what stays.
- Since `da06988` the portal shows "Truchsess" (logo and tab title). Some server messages still
  say "worker", "package" or "appliance"; the manual quotes them exactly.

## 1. Installer (before the box has a portal)

The installer runs from a USB stick and is used in a browser on the same network.

| Label | Who | What it does | Undo |
| --- | --- | --- | --- |
| Setup page title "Company OS Appliance setup" | Admin | The installer's page, served by the box while it runs from the USB stick. | n/a |
| Panel "Access", button "Refresh" | Admin | Shows boot mode, network state and message, setup Wi-Fi, the addresses to open, the friendly host name. | n/a |
| Panel "WiFi": "Scan", "Network", "Manual network name", "Password", "Connect WiFi" | Admin | Lists nearby Wi-Fi networks and joins one. Used when no cable network is found. | Yes: connect again with other details. |
| Setup Wi-Fi "CompanyOS-Setup-" plus six characters | Admin | Opened by the box when it finds no cable network. It has no password. It turns off about 12 seconds after "Connect WiFi". | n/a |
| Panel "Target disk" | Admin | Lists only built-in, non-removable disks. "The selected disk will be erased." | Yes, until "Erase and install". |
| Panel "Install": "Local URL", "Selected disk", checkbox "I understand this will erase every partition and file on the selected disk.", buttons "Write install plan" and "Erase and install" | Admin | Starts the installation. "Write install plan" is optional. | No, once confirmed. |
| Box "Erase and install?": "Cancel", "Yes, erase this disk and continue" | Admin | Final confirmation. | "Cancel" closes it. After "Yes": No. |
| Panels "State" and "Logs": "Log type", "Copy logs", "Download log file" | Admin | Shows progress and the logs for support. | n/a |
| Panel "Installation complete" | Admin | Says: remove the USB installer; the box restarts by itself from the internal disk; if the installer appears again, choose "Linux Boot Manager" or the internal disk in the boot menu. Shows the bootstrap code. | n/a |
| CEO bootstrap code `XXXX-XXXX-XXXX` | Admin | One-time code needed to create the first account. Printed at the end of the installation and in the install log. | Works once. A new code can be made on the console. |

Facts used by the pages:

- The box needs a computer that starts in UEFI mode and has at least one built-in disk.
- A cable network with automatic addresses (DHCP) is preferred. Wi-Fi is the fallback.
- The installed box is always called `myai`. Its address is **https://myai.local/**. Plain
  `http://` forwards to `https://`.
- The box makes its own certificate. Each browser warns once. The certificate fingerprint is
  shown on the console after the automatic login, on the **Sign in** screen ("This appliance's
  certificate fingerprint: ...") and on Administration, General, next to the SSH keys ("Portal
  certificate (self-signed): ..."). The very first screen ("Create the CEO administrator") does
  **not** show it.
- After the stick is removed, the box restarts by itself. No duration is given by the source.

## 2. Sign-in screens

| Label | Who | What it does | Undo |
| --- | --- | --- | --- |
| "Create the CEO administrator": "CEO name", "Work email", "Password", "Bootstrap code", button "Create administrator" | Admin, once | Creates the first account. Password: at least 12 characters, upper- and lower-case letters and a number. | No. There is one CEO administrator. |
| Link "Restore from a backup" (on the first screen) | Admin, once | Opens "Restore from a backup" instead of creating the account. | "Back" returns. |
| "Restore from a backup": "Bootstrap code", "Backup file" (`.age`), "Recovery key", "or the recovery key file", "Restore", "Back" | Admin, once | Restores a backup onto a fresh box. Afterwards: "Enter these again" table, button "Sign in". | No, once started. |
| "Sign in": "Work email", "Password", "Sign in" | Both | Signs in. Shows the certificate fingerprint. | n/a |
| "Change your temporary password": "Temporary password", "New password", "Change password" | Both | Required after the first sign-in with a temporary password, and after a reset. | n/a |
| "Your account" (tab, and the name in the header): name, e-mail, role; "Change your password": "Current password", "New password", "New password again", "Change password" | Both | Changes the own password. Same rules; must differ from the current one. Other browsers are signed out; this one stays. Office only: on the remote address the form is hidden and a note says the password is changed in the office. | Change it again. |
| Header: account name, role ("CEO administrator" or "member"), status line, "Sign out" | Both | Shows who is signed in. | n/a |
| Message "Too many login attempts. Wait 15 minutes and try again." | Both | After 6 wrong tries from one place in 15 minutes. | Wait 15 minutes. |
| Message "Email or password is incorrect." | Both | Wrong sign-in, or a disabled or removed account. | n/a |
| Message "The bootstrap code is missing or wrong." | Admin | Wrong bootstrap code. | n/a |
| Session length | Both | A session lasts 12 hours, then the person signs in again. | n/a |
| "Choose the appliance AI" (shown at once when no AI provider is set) | Admin | See section 9. | Yes. |
| "AI setup required": "The CEO administrator must configure the appliance AI before chat is available." | Member | Shown to members until the admin has chosen a provider. | n/a |
| "Starting the assistant": "This page will continue automatically." | Both | Shown while the box starts after a provider change. | n/a |

## 3. Navigation (since `da06988`)

| Entry | Who | What it is |
| --- | --- | --- |
| Chat | Both | Give work to an installed agent. |
| Runs | Both | Run history with filters All, Needs you, Active, Finished, Failed or cancelled, and a task search. Admin: every run. Member: own runs only. |
| Approvals (with a count) | Admin | Waiting decisions, notices ("Tells you after"), standing approvals, and Requests (product and agent requests). |
| Agents | Both | "Agents you can use" with "Open in chat". Admin: "Installed agents", "Store", "Install from a package file". Member: "Ask for a product or an agent", "Your products", "Request a new product", "Request another agent", "Your requests". |
| Administration | Admin | Sub-pages Overview, People and access, Budget, Connections, Knowledge, System, Backups, Remote access, Agent rules. Opens on Overview. |
| Navigation footer | Both | "Docs" (https://docs.truchsess.com/), the person's name (opens "Your account"; title "Your account and password"), role ("Administrator" or "Member") and company name, status line, Light/Dark switch, "Sign out". |

Below 768 px the navigation is one bar across the top.

## 4. Chat

| Label | Who | What it does | Undo |
| --- | --- | --- | --- |
| "Package" (list) | Both | Chooses an installed worker. Every active installed worker is listed for every user. | Yes. |
| Header line: name, package id, lane, data rule; link "N permissions · show" | Both | Shows what the worker may do. | n/a |
| "New conversation" | Both | Reloads the worker's run list. It does not delete anything. | n/a |
| Message box "Task for this package" | Both | Describe the work. Enter sends, Shift+Enter is a new line. Links go in the text. At most 12,000 characters. | n/a |
| "Attach" (and drag and drop, paste) | Both | Attaches text files: at most 5 files of 48 KB each, `.md`, `.txt`, `.csv`, `.json`, `.yaml`, `.yml`, `.log`. Not images or PDFs. | "Remove" on a chip. |
| "Send" | Both | Each message becomes one run. | Cancel the run (see Runs). |
| Note "Each message becomes one run in the workflow spine. Protected actions stop and ask you first." | Both | Always shown. | n/a |
| Secret guard: "This looks like a key or password. It was not sent to the AI. An admin can store it safely under Administration > Connections." | Both | A message that looks like a key or password is not sent. | Rewrite the message. |
| "This worker is not ready yet. Your admin needs to connect ... under Administration > Connections." | Both | A worker that needs a connection refuses tasks. | Admin adds the connection. |
| Budget banner (yellow at the warn level, red at the stop level), button "Request top-up" (admin, at stop) | Both see the banner | See section 13. | n/a |
| No worker installed: "No package is installed, so there is no agent to give work to." Admin button "Open Administration, Packages". | Both | | n/a |
| Run card: worker, start time, state, elapsed time, lane and model, data rule, cost, task text, decisions, waiting approval, reply, `result.md`, files, "Cancel run" | Both | One card per run, updated every 2 seconds. | n/a |
| Approval block "<worker> asks to <action>", "Approve", "Refuse" (admin); "Waiting for the CEO administrator to decide." (member) | Both | See section 6. | No, once decided. |
| "Cancel run" with a reason | Admin, or the member who started the run | Stops the run. "The turn in the sandbox is aborted; nothing is retried." | No. |
| File panel: "Open raw", "Close" | Both | Shows a Markdown file or an image from a run next to the chat. | n/a |

Run states (exact words): "Created, waiting for the worker", "Running in the package sandbox",
"Running", "Waiting for your approval", "Waiting for your check" (a member sees "Waiting for the
owner's check"), "Finished", "Failed", "Cancelled". Each run card also shows its autonomy level as
a colored label, notices as "Told you after: ...", and check decisions ("Result accepted by ...",
"Sent back for one rework turn by ...").

Time limits: one turn may take 600 seconds, or 1800 seconds for a worker that uses the browser.
A timed-out turn is retried at most once.

## 5. Runs

| Label | Who | What it does | Undo |
| --- | --- | --- | --- |
| "Run history" table: Started, Package, Task, State, Ended, Lane, Tokens, Cost, Approvals, Files | Both | Admin sees all runs. Member sees own runs. | n/a |
| "Package" filter, "Show self-tests" | Both | Filters the list. Self-tests are the box's own test runs, hidden by default. | Yes. |
| Budget line above the table | Both | Budget state of the period. | n/a |
| "Audit" | Both (own runs for members) | Opens "Audit trail": Time, Event, Actor, Summary. | n/a |
| "Cancel run" | Admin, or the run's starter | As in Chat. | No. |

## 6. Approvals tab (admin only)

| Label | Who | What it does | Undo |
| --- | --- | --- | --- |
| "Waiting for your decision" | Admin | Every run that waits for an approval, as run cards. "Nothing is waiting." when empty. | n/a |
| "Approve" / "Refuse" (two clicks, reason field) | Admin | Approve: the worker carries out exactly the approved action in a new turn. Refuse: the run fails with "Refused by <name>: <reason>". | No. |
| "Grant a standing approval": "Package", "Action", "Limit per calendar month (times)" (for Spend money: amount), "Expires on" (default three months), "Note (optional)", "Grant" | Admin | The chosen install may do this action without asking, within the limit, until the expiry. Over the limit it asks again. | Yes: "Revoke". |
| Actions offered: "Publish", "Send messages outside", "Spend money", "Chain actions" | Admin | The protected actions a standing approval may cover. "Use credentials" and "Deploy" always ask, with a reason. | n/a |
| "Standing approvals" table: Package, Action, Limit, Used, Expires, Granted by, Status, "Revoke" | Admin | "Revocation takes effect immediately." A grant for an action that always asks shows "not used: this action always asks". | No: grant a new one instead. |
| Panel "Tells you after", "Mark all as seen" | Admin | Notices of what workers did at "Tells you after" (knowledge and workboard writes, repository comments, issues and pushes). "Nothing new." when empty. | n/a |
| Checks in "Waiting for your decision": "Waiting for your check", "Accept" (with "Note (optional)"), "Send back" (with "Note for the package", required) | Admin | See section 17. | No, once decided. |

A member never decides an approval. Every decision is in the run's audit trail with the name.

## 7. Products and Requests

| Label | Who | What it does | Undo |
| --- | --- | --- | --- |
| "Your products": Product, Status, Access, Agents | Both | Admin: all products. Member: assigned products and own pending requests. | n/a |
| "Add a product": "Product id", "Product name", "Add product" | Admin | Creates an active product at once. Id: lowercase letters, digits, hyphens. | No: there is no delete or rename in the portal. |
| "Request a new product": "Product name", "Estimated monthly cost", "Purpose", "Send for approval" | Both | Creates a pending product. When the admin approves, it becomes active and the requester becomes its owner. | No: there is no withdraw. |
| "Request another agent": "Product", "Estimated monthly cost", "Agent name", "Agent role", "Why this agent is needed", "Send for approval" | Both (assigned product) | Sends a request. An approved request is recorded as an agent of the product. It does **not** install a worker; work goes only to installed packages. | No. |
| "Requests" tab: Request, Product, Cost / month, Status, Decision, Created | Both | Own requests. | n/a |

Product access: "Owner" and "Member" exist. In this release both see the same things in the
portal; neither can install, approve or administer.

## 8. Administration, General (admin only)

### System

| Label | What it does | Undo |
| --- | --- | --- |
| "Running release", "Newest available" | Shows the running and the newest signed release. | n/a |
| "Check for updates" | Asks for the newest release. | n/a |
| "Update now to <release>" (two clicks) | Checks again for the newest release, then installs it. "The portal and the assistant restart during the switch; the previous generation is kept for a roll back." | Yes: "Roll back". |
| "Cancel update" (two clicks) | Stops before the switch. "Nothing changes on the appliance; what was downloaded is kept." | n/a |
| "Roll back" (two clicks) | Returns to the previous system generation. | Update again. |
| Download line, step list, "Portal restarting, reconnecting", "Details (update log)" | Progress of a running update. | n/a |

Update facts:

- Releases are signed. The box checks both signatures and the file checksum before anything
  changes. An older release is never offered ("not offered: older than the running release").
- The box checks for a new release once a day by itself. It never installs by itself:
  installing needs "Update now".
- "Update now" works only after a check of the last 15 minutes ("Check for updates first: the
  last check is too old to know the newest release."); the page does that check itself.
- Steps: "Verify the release signature", "Download the system closure", "Verify the closure
  (sha256 and signature)", "Import the closure into the Nix store", "Switch to the new system
  generation", "Restart the assistant runtime", "Self-check (services and health endpoints)",
  "Record the release and prune old generations".
- A failed switch or a failed self-check (up to 7 minutes) returns to the previous generation by
  itself. The three newest generations are kept.
- An update never restarts the computer. A new kernel shows "reboot pending (new kernel)".
- The update does not wait for running tasks; the assistant runtime restarts. Update when no
  task is running.
- Outcome line: "Now running <version>, generation N, took M min S s".
- A slow download is retried; at the end: "The download from GitHub is too slow or stopped.
  Nothing was changed. Try again later."

### Backups

| Label | What it does | Undo |
| --- | --- | --- |
| "Back up now" | Makes a backup now. Disabled until a recovery key exists. | n/a |
| "Create the recovery key" / "Create a new recovery key" | Shows the key once: "Copy", "Download as a file", "I have saved it". | A new key can be made; older backups then need the older key. |
| "Backups on this box": Made, Size, How, Recovery key, "Download" | Lists the kept backups (the last 7). Download runs through the page: "Downloading: X of Y (N%)" under the link; on a break "The download broke after ...: the connection to the box was lost. Nothing was saved. ..."; press Download again. Same for the top-up file. | n/a |
| "Restore": "Backup" (a kept backup or "A backup file from this computer"), "Backup file", "Recovery key", "or the recovery key file", "Restore" (two clicks) | Puts the box back to the backup's state. Everyone signs in again. If a step fails, the box returns to how it was. | No: work after the backup is replaced. |
| "Enter these again" table | After a restore: which secrets to enter again and where. | n/a |
| "Backup history" | Time, Event, By, Detail. | n/a |

Backup facts:

- The nightly backup runs at 03:30 by the box's clock (the box sets no time zone, so this is
  most likely 03:30 UTC; to be confirmed on a box), plus up to 10 minutes. Nightly and manual
  backups together: the newest 7 are kept.
- Without a recovery key: "No recovery key yet: the box makes no backup until one exists."
- Backup steps: "Prepare", "Copy the databases", "Collect the files", "Keep the newest 7".
  Running tasks are waited for up to 5 minutes.
- Restore steps: "Open the backup with the recovery key", "Check the release and every file",
  "Keep a safety copy of the box", "Stop the services", "Put the backup in place", "Update the
  database to this release", "Start the services", "Check that everything runs".
- A backup restores only into the same or a newer release ("This backup comes from a newer
  release (...). Update this box first, then restore.").
- The wrong key: "This recovery key does not open this backup. Use the recovery key that was
  current when the backup was made. Nothing was changed."
- Upload limit for a backup file: 16 GiB. The file is named `truchsess-backup-<time>.age`.
- "Enter these again" rows (What, Where): "The AI provider key (...)", "Administration,
  General: Connect an AI provider" (the button there is called "Change AI provider"); "GitHub
  (...)", "Administration, Connections: Connect GitHub"; "The API key for ...",
  "Administration, Connections"; "The store enrolment", "Administration, Packages, Store:
  Enrol"; "Remote access (it is switched off)", "Administration, Remote access". Two more rows
  are for the vendor's own box only.
- On a box that is already set up, the first-screen restore is refused: "This box is already
  set up: restore under Administration, General, Backups."

The nightly backup keeps 7. Secrets are never in a backup: connection keys, the
AI provider key, the store enrolment, the remote access code.

### Budget

| Label | What it does | Undo |
| --- | --- | --- |
| "Monthly limit", "Used this period", "Remaining", "Projected for the period", "Not from a run (unattributed)" | The period's numbers. | n/a |
| "Refresh usage" | Reads the usage again. | n/a |
| "Per package this period" | Runs, turns, tokens, cost per worker. | n/a |
| "Top-up requests", "Top-up amount", "Note (optional)", "Request top-up", "Download", "Cancel" | Creates a signed request for more budget, to send to the vendor (Old School). | "Cancel" on an open request. |
| "Edit the budget": "Monthly limit", "Warn at (percent)", "Stop new runs at (percent)", "Period starts on day" (1 to 28), "Billing rate", "Save budget" | Sets the budget. In "Managed by Old School" mode the limit can be raised only up to the metered key's limit. | Yes. |
| "Budget events" | The budget's own log. | n/a |

### People and access

| Label | What it does | Undo |
| --- | --- | --- |
| "Add a user": "Name", "Work email", "Create user" | Creates a member and shows a one-time temporary password: "copy it now; it is not shown again." | Disable, then Remove. |
| "Assign product access": "User", "Product", "Access" (Member, Owner), "Assign access" | Gives a member a product. | Yes: "Remove" in "Product access". |
| "People and access": Name, Email, Role (Administrator, Member), State (Active, Must change password, Disabled, Removed), Last login, buttons | Lists accounts. Buttons only on member rows that are not removed. | n/a |
| "Reset password", "Confirm reset" (not on a disabled row) | "New one-time password for <name>. Every session of this person has ended." Shows "One-time password for <name>: ... copy it now; it is not shown again." Failed sign-ins cleared; the person must change it at the next sign-in. Office only. | No; the person sets a new one. |
| "Disable", "Confirm disable" | "<name> is disabled and signed out everywhere. Runs and history stay." No sign-in, local or remote. Works on the remote address. | "Enable". |
| "Enable", "Confirm enable" (disabled row) | "<name> can sign in again." Same password and product access. Office only. | "Disable". |
| "Remove", type the e-mail, "Confirm remove" (disabled row only) | "<name> is removed. The e-mail address is free; the history keeps the name." History shows "(removed person)". Works on the remote address. Refused unless disabled first. | No. |
| "Change name or e-mail", "Save", "Cancel" | "Saved for <name>." A new e-mail signs the person out. Office only. | Change again. |
| Note under the table | "Your own password: Your account. Forgotten administrator password: on the box, as root, run sudo company-os-people reset-admin." | n/a |
| "Change AI provider" (in "People and access") | Opens "Choose the appliance AI". | Yes. |
| "Product access": Person, Product, Access, Assigned, "Remove" | Lists and removes assignments. | Assign again. |
| "Approvals": Requested by, Request, Product, Cost / month, Status, Decision, "Approve", "Deny" | Decides product and agent requests. | No. |
| "Company activity": Time, Person, Activity, Type | The last 200 events of the box. | n/a |
| "Earlier assistant conversations" | Old chats of the removed built-in assistant, kept for the record. | n/a |
| "Product catalog" | Status of the product list the box loads at start. | n/a |

### Operator SSH access

| Label | What it does | Undo |
| --- | --- | --- |
| "Turn SSH on", "Turn SSH off" | Starts or stops the remote console login (SSH). Off stays off across restarts and updates. | Yes. |
| "Public key", "Or import from GitHub (user name)", "Add key"; table Type, Fingerprint, Comment, State, "Remove" | Manages the keys that may sign in over SSH. | Yes. |

## 9. Choose the appliance AI (admin only)

| Label | What it does | Undo |
| --- | --- | --- |
| "Billing mode": "Own key", "Managed by Old School" | Own key: the company's own provider key; nothing is metered by the vendor. Managed: the metered key the vendor issued; the budget is enforced. | Yes. |
| "Provider" | OpenAI; Anthropic; Google Gemini; xAI / Grok; OpenRouter; Kimi / Moonshot; PHOENIQS (Switzerland); Local model / Ollama; Private or custom provider. In managed mode the provider is fixed to OpenRouter. | Yes. |
| "Key label from Old School (optional)" | Managed mode only. | Yes. |
| "Provider name", "API base URL", "API format" | Private or custom provider (and the address for Ollama). | Yes. |
| "Model ID" | The default model. | Yes. |
| "Credential type", "API key or provider token" | The key. Stays on the box and is never shown again. | Replace it. |
| "Save provider", "Cancel" | Saves. The box then shows "Starting the assistant". Choosing a provider rewrites the model lanes with that provider's defaults. | Yes. |
| "Sign in with ChatGPT (operator only)" | Shown only when the vendor switched it on for the vendor's own box. Not for customers. | n/a |

## 10. Administration, Packages (admin only)

### Store

| Label | What it does | Undo |
| --- | --- | --- |
| "Store address", "Enrolment code", "Label for this appliance", "Private test server (advanced)", "Enrol" | Enrols the box with the store once, with a one-time code. | No undo in the portal. |
| "Enrolled as", "Store", "Label", "Enrolled", "Last contact", "Appliance key id" | Enrolment facts. Also lists the publisher keys the store offered and whether each is trusted here. | n/a |
| "Refresh catalog" | Loads the store's function bundles with price and packages. | n/a |
| "Subscribe" (or "Subscribe (no price yet)", disabled) | Starts the payment at the store. "Open the payment page". The page checks every few seconds. | Cancel the subscription. |
| Subscription badges: "not subscribed", "checkout pending", "active", "cancels <date>", "payment past due", "subscription ended" | State of a bundle. | n/a |
| "Cancel subscription" (two clicks) | Ends the bundle at the period end. Only possible when no package of the bundle is installed. "Cancelled: the functions of this bundle can be used until <date>." | Subscribe again. |
| "Manage subscription", "Open the subscription page" | Opens the store's page for invoices, payment method and cancellation. The link is valid for a short time. | n/a |
| Package row: Package id, Publisher, Package digest, Installed here, "Permissions: N would be granted, M declined by the owner policy", "Requires", "You choose at install", "Install" | Installs a store package (reserve, download, install, acknowledge). | "Uninstall". |

A store package can be installed only once per box.

Store holds and the period end (T39b): when the store still holds an unfinished install from
this box, the package row says "Installed here: no; the store still holds an unfinished install
from this box (...)" and offers "Install" with "The store still holds an install from this box
that never finished. Install takes it over with the answers above." The row then says "took over
the store's unfinished install". After a cancelled subscription ends, a daily run (04:10, and 15
minutes after start) stops the bundle's store installs: no new tasks, Chat refuses with "The
subscription for <function> has ended. Subscribe again to use this worker.", the row says
"Stopped" and "Files are kept until you uninstall.". Nothing is deleted. Subscribing again
resumes the same installs. A failed install that never became active is removed at the period
end.

### Trusted publishers

| Label | What it does | Undo |
| --- | --- | --- |
| Table Key id, Label, Registered, By, "Remove" | A package installs only when signed by one of these keys. | Add the key again. |
| "Public key (PEM, from the .pub file)", "Or upload the .pub file", "Label", "Add publisher" | Adds a publisher key. | "Remove". Installed packages keep running. |

### Which AI providers may see your data (the data rule)

| Label | What it does | Undo |
| --- | --- | --- |
| "What providers may do with your data": "Never kept, never trained on" (default), "Never trained on", "Any provider, may keep and train on your data" | Every model request goes only to providers that meet this. | Yes. |
| "Where your data may be processed": "Any country" (default), "EU or Switzerland", "Switzerland only", "On this box only" | Residency. EU or Switzerland and Switzerland only let through only PHOENIQS (Switzerland) or a model on the box. On this box only refuses every run today (no local model ships). | Yes. |
| Floor note | "Packages that read or write your code or knowledge, or use stored credentials, always run at least 'never trained on'." | n/a |
| "Save data rule" | Saves both choices. | Yes. |

### Owner policy

| Label | What it does | Undo |
| --- | --- | --- |
| Families: Workspace, Commands, Internet, Repositories, Knowledge, Workboard, Delegation, Protected actions, Model lane, Browser | Every permission a worker may be granted, in plain words. Checkboxes, or "Allow" with a value. | Yes. |
| "Save policy" | Saves the list. "Saved <time>." or "Not saved: <reason>". Default: nothing allowed. | Yes. |

A policy change does not reach a worker that is already installed.

### Autonomy levels

| Label | What it does | Undo |
| --- | --- | --- |
| One table per installed package: "What it does", "Now", "Level", "Floor"; a menu per row, or "Fixed" | Shows and raises the level of each kind of action the package has permission for. A raise applies to every install of the package. | Yes: choose the floor again. |
| "Save levels" | Saves the changed rows. "Saved for <package>. ..." or "Nothing changed." A level below the floor is refused. | Yes. |

### Install a package

| Label | What it does | Undo |
| --- | --- | --- |
| "Bundle file", "Upload and inspect" (up to 64 MB, `.truchsess-bundle.tar`) | Uploads a signed package file. | "discard" on "Uploaded, not installed". |
| Inspection: Package id, Version, Bundle file, Publisher key id, Publisher, Signature, Package digest, "Declares", "Will be granted", "Declined" | What the worker will receive, before installing. | n/a |
| "Name for this install" | The name shown in Chat. Needed for a second install of the same package. | "Change". |
| "This package asks you to choose:" (install questions): a repository, a product, a website, "Skip (the permission is declined)" | The install questions. | "Change". |
| "Install" / "Install another" | Installs. | "Uninstall". |
| "Update the install to version X" / "Update all N installs to version X" | Updates every install of the package; each keeps its name, choices and workspace. | No direct way back (see G18). |
| Product mapping: "Map products", "Create a new product", "Resume the install" | When the package names a product the box does not have. | n/a |

### Installed packages

| Label | What it does | Undo |
| --- | --- | --- |
| Table Package, State, Ready, Agent id, Model, Sandbox image, Permissions | Every install. "from the store" marks store installs. | n/a |
| "Ready" / "Needs <connection> from the admin", "Open Connections" | Whether the worker has its connections. A failed row shows "Not running", a stopped row "Stopped", a removed row "Removed", an uninstalled row "Uninstalled" (no buttons). | n/a |
| "Choose" | Answers install questions an install still waits for. | n/a |
| "Change", "Save and apply" | New answers or a new name. The install keeps its workspace, memory and identity. | Change again. |
| "Retry", "Remove" (failed install) | A failed install left nothing active. Retry runs it again; Remove closes it. After Remove of a store install the row says "The store still holds this install. ...", "The store no longer lists this install." or "The store could not be reached ..." with "Check with the store again". | n/a |
| "Uninstall" (two clicks) | Reverses every binding and removes the worker's workspace. A signed receipt is kept (store installs: sent to the store; the last package of a bundle ends the subscription at the period end). | No: the workspace is deleted. Install again for a fresh start. |

### Model lanes

| Label | What it does | Undo |
| --- | --- | --- |
| "Cheap", "Standard", "Frontier", "Other model...", "Fallback lane (no lane permission)" | Which model each lane uses. Automatic models are refused. | Yes. |
| Table Lane, Model, "Meets '<rule>'?" | Whether each lane meets the data rule. | n/a |
| "Save lanes", "Apply to installed packages", "Check providers now" | Saves, rewrites installed workers, checks providers. | Yes. |

### Self-tests

| Label | What it does | Undo |
| --- | --- | --- |
| "Run the sandbox tests" | Checks the box's isolation. | n/a |
| "Run the gateway test" (two clicks) | Restarts the assistant runtime twice; chat is unavailable for several minutes. Refused while a run is active. | n/a |
| "Run the Connection secrecy test" | Checks that workers cannot read keys. | n/a |

## 11. Administration, Knowledge (admin only, office only)

| Label | What it does | Undo |
| --- | --- | --- |
| "Product", "Files" (`.zip`, `.md`, `.txt`), "Upload and review" | Uploads documents for one product. At most 50 MB and 2,000 files per upload, 64 KB per document, UTF-8 text only. | "Discard". |
| Review table: Import, Key, Original name, Title, Size, Status ("new", "changed: N line(s) added, M removed", "unchanged"); "Skipped" table | What would be written. Unchanged documents are not selected. | n/a |
| "Import selected", "Discard" | Writes the chosen documents. "Earlier versions of changed documents stay readable." | Partly: import the earlier files again to make them current. A new document cannot be removed. |

An upload is gone after an hour, or when the page is left.

## 12. Administration, Connections (admin only, office only)

| Label | What it does | Undo |
| --- | --- | --- |
| "GitHub organisation", "Connect GitHub" | Creates the box's own GitHub App on GitHub ("Create GitHub App"), then "Choose the repositories on GitHub". | "Disconnect". |
| Card "Connected: <organisation>, N repositories": Status, App, Organisation, Installation id, Created, Repositories read, Last used, Needed by | Connection facts. | n/a |
| "Change repositories", "Refresh" / "Check again", "Disconnect" (two clicks), "Delete the App on GitHub" | Manage. Disconnect removes the stored key; workers with repository permissions stop reaching GitHub. | Connect again. |
| Permission check text and steps on GitHub | When this release needs more GitHub permissions than granted. | n/a |
| "Advanced: use an existing GitHub App": "GitHub organisation", "App id", "Installation id", "Private key (.pem)", "Store the existing App" | Uses an App made elsewhere. Needs metadata read, contents write, pull requests write, issues write. | "Disconnect". |
| "API keys": one card per key a worker needs: Needed by, Hosts, Status, Key, Last used, "Where to get a key", "Add key" / "Replace", "Remove" | Stores a key. The worker can use it only toward the hosts it declared and can never read it. | "Remove" (workers that need it then refuse tasks). |
| "Recent changes" | Who connected, replaced or removed what. Never a secret. | n/a |

Status words: "connected", "App created, repositories not chosen yet", "failing (the host
refused the last request)", "needed", "stored, no installed package needs it".

What "ready" means: an installed worker is "Ready" when every connection it needs is stored.
Otherwise it shows "Needs <connection> from the admin" and refuses tasks.

No worker can merge, push to the default branch, or create tags or releases on GitHub. Writes
go only to the worker's own branches and pull requests.

## 13. Budget behaviour (both see the banner)

- Warn level (default 80 percent): yellow banner "Budget warning: ... New runs stop at 100
  percent." Runs still start.
- Stop level (default 100 percent): red banner "Budget exhausted: ... New runs are paused until
  the period ends on <date> or the budget is raised. Runs already in progress finish their
  current step." Send is disabled. The admin sees "Request top-up".
- In "Own key" mode nothing is enforced; the panel shows the box's own usage estimate.
- PHOENIQS (Switzerland) is always own key and not metered by the box.

## 14. Administration, Remote access (admin only)

| Label | What it does | Undo |
| --- | --- | --- |
| Disclosure text "Remote access runs through Cloudflare. ..." | What passes through the remote access service. | n/a |
| "Remote access code (from the operator; it is entered once and never shown again)", checkbox "I have read what passes through Cloudflare", "Switch on" | Switches remote access on. The code comes from the vendor. | "Switch off". |
| State "Off", "Connecting", "Connected"; "Address", "Last contact", "Switched on by" | Remote access state. | n/a |
| "Switch off" (two clicks) | "Remote access stops for everyone and the stored code is deleted. A new code from the operator is needed to switch it on again." | Needs a new code. |
| Note on the remote address: "You are on the remote address. Secrets, SSH and updates can only be changed in the office, on the local address." | Shown to everyone on the remote address. | n/a |

On the remote address a person enters their e-mail, types the one-time code that arrives by
e-mail, and is in the portal as themselves. Only e-mails of accounts on the box get in
("Your e-mail is not a member of this Truchsess. Ask your admin."). Refused on the remote
address: sign-in with a password, password change, AI provider, adding users, SSH, store
enrolment, publishers, switching remote access on, Connections, Knowledge, System (updates and
backups).

## 15. Gaps: what people would expect but cannot do yet

Each gap has the workaround today and who to ask. "Support" means the support contact set in
the manual's configuration. The page `/not-yet/` is generated from this table:
run `npm run sync:not-yet` after a change (CI fails when the page and this table differ).

Closed in the checked release (they no longer appear on `/not-yet/`): G1 (reset a forgotten
password), G2 (remove, disable or rename a user, change an e-mail), G4 (change your own password).
Closed in docs part 7a (release Truchsess 2026.10.21-84a4137): G5 (who may use an agent is set on
its card, #141), G19 (store installs update, #85 and #134), G22 (updates at night, #149). Added in
part 7a: G37 to G40 (mail and calendars). Closed in docs part 7b: G34 and G35 (the box activates
with the code from the card and gets its starter credit in the guided first setup, #143 and #147).

| # | Area | Gap | Workaround today | Who to ask |
| --- | --- | --- | --- | --- |
| G3 | Accounts and roles | A second administrator, or making a member an administrator. | Share administration tasks by asking the one CEO administrator. | Support. |
| G6 | Accounts and roles | See other people's runs as a member, or share a run. | Members see own runs only. Share the result file or text another way. | Administrator (sees all runs). |
| G7 | Approvals and autonomy | Approve or refuse as a member, or as a product owner. | Only the CEO administrator decides. | Administrator. |
| G11 | Knowledge, workboard and products | See, search or edit the company knowledge in the portal, or look at older revisions. | Ask an agent with knowledge permission to search, read or quote a document (it can also read an older revision). | Administrator. |
| G12 | Knowledge, workboard and products | Delete a knowledge document. | Import a corrected version (it becomes the current one). A document cannot be removed. | Support. |
| G13 | Knowledge, workboard and products | See the workboard in the portal. | Ask an agent with workboard permission to list or update cards in a task. | Administrator. |
| G14 | The box | Report a problem from the portal. | Use "Copy logs" (installer) or the run's "Audit" and "Details (update log)"; send them with a description to support. | Support. |
| G15 | Knowledge, workboard and products | Withdraw a request. | Deny pending requests. Products can be renamed, archived and restored; nothing is deleted. | Administrator. |
| G16 | Knowledge, workboard and products | An approved request for another agent installs it. | Approval only records the request. The administrator installs the agent under Agents. | Administrator. |
| G17 | Agents and the store | A second copy of a store agent when the store does not sell copies. | When the store sells copies, the agent's settings offer Add another copy. Otherwise a signed package file can be installed several times. | Support. |
| G18 | Agents and the store | Roll back an agent to an earlier version. | Not offered. Uninstall and install the earlier signed file (the workspace is lost). | Support. |
| G20 | Agents and the store | Leave the store (undo enrolment). | Not offered in the portal. Cancel every subscription. | Support. |
| G21 | The box | Change the box's name or address (always `truchsess.local`; `myai.local` also works). | None. | Support. |
| G23 | The box | Choose the backup time or how many backups are kept, or back up to another place automatically. | Backups run at 03:30 and 7 are kept. Download a backup and keep it elsewhere. | Administrator. |
| G24 | The box | A model running on the box ("On this box only"). | No local model ships yet; this choice refuses every run. Use PHOENIQS (Switzerland) for "Switzerland only". | Administrator. |
| G25 | Tasks | Images, PDFs or other binary files as task attachments. | Text files only, up to 48 KB. Put a link in the message instead. | Administrator. |
| G26 | The box | Remote sign-in for secrets (passwords, keys, updates, knowledge import). | Do these in the office on the local address. | Administrator. |
| G27 | Agents and the store | The LinkedIn posting agent. | Planned, not in the store yet. | Support. |
| G28 | Agents and the store | Change the owner policy for an already installed agent. | Use "Change" for the install questions, or uninstall and install again. | Administrator. |
| G29 | Approvals and autonomy | Notifications (e-mail or chat) when an approval or a check waits, or a run ends. | Open Home: the menu entry shows how many things wait, and Needs you lists them. | Administrator. |
| G30 | The box | A language other than English in the portal. | None. | Support. |
| G31 | The box | Show the certificate fingerprint on the very first screen. | Read it on the box's console (screen and keyboard) after the automatic login. | Support. |
| G32 | Approvals and autonomy | A different autonomy level for one install of a package. | A level applies to every install of the package. Install a separate package if you need different levels. | Administrator. |
| G33 | Approvals and autonomy | Approve a repository comment, issue or push before it happens. | Repository actions can be raised to "Waits for your check" only. To approve each change, remove the repository permission and ask the agent to describe the change in its answer. | Administrator. |
| G36 | Tasks | Speech recognition by the phone itself (Apple or Google). | Use "Hold to talk": the box turns speech into text, and the audio stays on the box. | Administrator. |
| G37 | Mail and calendars | "Connect with Microsoft": Microsoft 365, Outlook.com and Hotmail mailboxes and Microsoft 365 calendars. | Coming soon. Use a mailbox at the company's own mail server or Gmail over IMAP. For Microsoft 365, ask support. | Support. |
| G38 | Mail and calendars | Proton Mail or Tuta mail. | Not possible: their mail is end-to-end encrypted. Use another mailbox. | Support. |
| G39 | Mail and calendars | An agent sends, deletes or moves mail. | Never: agents read mail and write drafts. You read each draft and send it yourself. | Administrator. |
| G40 | Mail and calendars | An agent creates, changes or answers a meeting. | Never: agents only read calendars. Make the change in your calendar yourself. | Administrator. |

## 16. Workers (store functions)

Source: the packages' own definitions (`agent-definition.json` on the main line of the package
repository), given by the supervisor on 2026-10-08. This session could not read that repository;
the box shows the same facts before **Install**. Function to package:

| Store function id | Packages |
| --- | --- |
| software-delivery | build-issue-writer, build-instructions-keeper, build-qa-reviewer, build-security-reviewer, build-ci-fixer, build-merge-gate |
| product-ownership | product-owner |
| website-care | website-owner |
| design-review | ivo-design-v2 |
| marketing-planning | marketing-planner |
| strategy-and-challenge | strategy, challenger |
| pricing-and-business-models | pricing-models |
| visibility-in-ai-search | ai-visibility |
| linkedin-posting | planned, no package yet |

Each worker page lists every permission in the portal's plain words, the install question that
fills each permission with a value chosen at install, and whether the permission must be allowed
in **Owner policy** (fixed permissions) or is allowed by the install answer (verified in the
activator: an answer is added to the owner's allow list for that install). No package has a
protected action, so none asks for an approval in this release. Prices are not written on the
pages; each links to its catalog page.

## 17. Autonomy levels (in the release since `f1af221`)

| Label | Who | What it does | Undo |
| --- | --- | --- | --- |
| Levels "Runs on its own" (green), "Tells you after" (blue), "Waits for your check" (yellow), "Asks you first" (orange), "Always asks, with a reason" (red) | Both see them on cards | How much a worker does on its own per kind of action. | n/a |
| "Waiting for your check" / "Waiting for the owner's check" | Admin decides; the member sees the waiting line and "The result waits for the owner's check. You see it once the owner accepts it." | The run finished; its result and files are hidden from everyone but the administrator until Accept. A run cancelled before Accept keeps them hidden. | n/a |
| "Accept", "Confirm accept", "Note (optional)" | Admin | Releases the result: "The run is finished and its result is shown to everyone who may see the run." | No. |
| "Send back", "Confirm send back", "Note for the package" (required: "Write what the package should change first.") | Admin | One rework turn with the note, then held again. Once per run: "Sent back once already: accept it, or cancel the run." | No. |
| Approval card with a level label; "Reason (required)" and "This action always asks, and your decision needs a reason." | Admin | For "Always asks, with a reason". | No. |
| Held write: "Nothing is written yet. Approve writes it exactly as shown; Refuse writes nothing." | Admin | A knowledge or workboard write raised to "Asks you first" or higher waits for the decision. | No. |

Floors and raises (the panel's own words):

| Kind of action | Floor | Can be raised to |
| --- | --- | --- |
| Reads its own workspace; Reaches the internet through the box's list; Renders web pages in its sandbox; Reads repositories; Reads test results; Reads company knowledge; Reads the workboard | Runs on its own | Fixed |
| Writes files in its own workspace | Runs on its own | Tells you after, Waits for your check |
| Hands work to other packages | Runs on its own | Tells you after, Waits for your check, Asks you first, Always asks, with a reason (the last two since `12b3acf`) |
| Writes company knowledge; Changes the workboard | Tells you after | Waits for your check, Asks you first, Always asks, with a reason |
| Comments on and reviews pull requests; Creates and updates issues; Pushes its own branches and opens pull requests | Tells you after | Waits for your check |
| Publishes; Sends messages outside the box; Chains further actions; Spends money (within its limit) | Asks you first | Always asks, with a reason |
| Uses credentials; Deploys | Always asks, with a reason | Fixed |

A check holds the result, not the writes: workspace files, knowledge revisions, workboard changes
and repository comments, issues and pushes stay. Spending above the per-action limit stays
refused, and merges stay impossible.

## 18. Hand-offs between workers (in the release since `12b3acf`)

Input: the section "For the user docs" of truchsess PR #60, checked against the `12b3acf` source
(portal run card, approval card, the spine's refusal messages).

| Label | Who | What it does | Undo |
| --- | --- | --- | --- |
| Run card block "Handed over to other packages": each handed-over task with the worker's name (link), state and cost; "Cost with the handed-over tasks: ..." ("so far" while running) | Both (on runs they may see) | Lists the work this task handed to other workers. | n/a |
| "Handed over by <worker> from its task <run>" (link back) | Both | Shown on a handed-over task. It appears in the chat and history of the person who started the first task. | n/a |
| Link to a run of an uninstalled worker: "That package is not installed any more; its run stays in the run history." | Both | | n/a |
| Approval card for a held hand-off: "hand this task to <worker>: ..." with the full task text; "Nothing starts yet. Approve hands this task over exactly as shown (the other package works with its own permissions); Refuse starts nothing." | Admin | At "Asks you first" or "Always asks, with a reason" for "Hands work to other packages". | No, once decided. |

Limits (the worker says why in its answer): the permission "Hand work to one other installed
package" for that exact worker; at most 3 handed-over tasks open per task; at most 2 levels deep;
never back to a worker already in the chain; a worker on a local model takes no handed-over work;
no start when the monthly budget is used up; the product must be one of the asking worker's
products. The handed-over task runs with its own worker's permissions, lane and data rule. While
two tasks wait for work they handed over, a new task can show "Created, waiting for the worker".

## 19. Known issues (reported by the supervisor and the task PRs, 2026-10-08)

| Issue | Who | Cause | Workaround | Fix |
| --- | --- | --- | --- | --- |
| Gideon (Visibility in AI search), asked about a website other than the one installed, writes a misleading report that the site is unreachable. | Both | The box blocks every host but the install answer; the agent reports the block as "unreachable". | Ask only about the installed website; change it with Change on the agent's row. | T51 and Gideon 1.0.1 |

## 20. Notes for the Website Owner

- When T51 and Gideon 1.0.1 ship, remove the Gideon row in section 19, the known-issue box on
  `/agents/visibility-in-ai-search/`, the note in `/admin/agent-rules/` example 1 and the matching
  row on `/troubleshooting/`. When T49 (a unique name per box) ships, update "Two boxes in one
  office" on `/setup/unbox-and-connect/` and `/troubleshooting/`. When T47 ships (Trust button on
  the store card, Copy button for passwords, no "worker" in the portal), update
  `/setup/store-enrolment/`, `/admin/store/`, `/admin/users/`, `/setup/members/` and remove the
  "(the agent)" notes.
- When G3 (a second administrator) or G5 (which agents a member sees) is decided and built,
  update the gap table, `/start/roles/`, `/admin/users/` and `/setup/members/`.
- When the trusted-certificate decision is built, update the certificate steps on
  `/start/member/`, `/setup/unbox-and-connect/` and `/troubleshooting/`.
- Reader pages never show internal task numbers; `npm run check:text` fails on one. Task
  numbers stay in this inventory.
- `/start/member/` says "agent" for the AI workers, as the portal is moving to that word. The
  other pages still say "worker"; change them when the portal shows "agent".
- The installer's own texts still name the old product ("Company OS") and an older host name on
  the setup Wi-Fi. The manual tells the reader what they will see.

## 21. Where everything is since `da06988` (T40, PR #73)

From `docs/architecture/portal-structure.md`, section 1.3, checked against the portal page.

| Function | Before | Now |
| --- | --- | --- |
| Budget banner, "Request top-up" | Chat | Chat |
| Run history, audit trail | Runs tab | Runs (with filters and search) |
| Waiting for your decision, Tells you after, standing approvals | Approvals tab | Approvals |
| Decide product and agent requests | Administration, General, "Approvals" | Approvals, "Requests" |
| Products, add a product, product catalog | Products tab; General | Administration › Knowledge, "Products and their knowledge" |
| Request a new product, request another agent, your requests | Products tab; Requests tab | End of Agents ("Ask for a product or an agent", "Your requests"); members also see "Your products" there |
| Your account, change your password | Your account tab | Your account, from the name in the navigation footer |
| Store, install from a package file, installed agents | Administration, Packages | Agents ("Store", "Install from a package file", "Installed agents") |
| Trusted publishers, owner policy, data rule, autonomy levels, model lanes, "Change AI provider" | Administration, Packages; General | Administration › Agent rules |
| AI of this box (switch to managed AI) | (new) | Administration › Agent rules |
| Self-tests | Administration, Packages | Administration › System |
| Company name (new), system (release, update, roll back), voice input, earlier assistant conversations | General | Administration › System |
| Backups (recovery key, backups, restore, enter these again) | General | Administration › Backups |
| Budget | General | Administration › Budget |
| Add a user, People and access, assign product access, product access | General | Administration › People and access |
| Operator SSH access | General | Administration › Remote access ("Operator access over SSH") |
| Company activity | General | Administration › Overview ("Recent activity") |
| Needs your attention, Areas | (none) | Administration › Overview |
| Import documents | Administration, Knowledge | Administration › Knowledge |
| Connections, Remote access | same | same |

The portal's shared "Not yet" note links to `/not-yet/`; no built page uses it today.

Server messages that still name the old places (quoted as they are; the manual says where to go):
- "This appliance has no products yet. Add one on the Products tab, then install again."
- "The AI is not set up yet. Activate it with the code from the card under Administration, General, or choose your own AI key there." (after "Activate later")

## 22. First run with an activation code, managed AI, starter credit (T42, PR #68)

| Label | Who | What it does | Undo |
| --- | --- | --- | --- |
| "Activate this box": "Activation code", "Activate", "Private test server (advanced)" ("Store address", "CA certificate of the test server (PEM)"), "Try again", "Continue" | Admin, at the first run while no AI is set | Steps "Enrol this box in the store", "Store the AI key", "Set up the managed AI (never kept, never trained on)", "Set the starter credit", "Test the AI"; then "AI is ready." | Change AI provider. |
| "Use my own AI key instead" | Admin | Opens "Choose the appliance AI". | n/a |
| "Activate later" | Admin | Opens the portal without AI, with the note quoted in section 21. Shown again at the next sign-in while no AI is set. | n/a |
| Administration › Agent rules › "AI of this box": "Switch to managed AI with an activation code", "Activation code", "Switch to managed AI", "Try again" | Admin | The same steps for a box already set up. A store without this service: "This store does not deliver the AI to a box that is already enrolled yet. ..." | Change AI provider. |
| Starter credit | Both see the banner | One time, CHF 50 (from the store), no monthly reset. Warning at 80 percent ("AI starter credit: N percent is used ..."), stop at 100 percent ("The AI starter credit is used up. New runs are paused. Request a top-up, or use your own AI key."), with "Request top-up" and "Use my own AI key". | Top-up, or own key. |
| Key refused | Both see the banner | "The AI key of this box was switched off by the provider. ..." / "The AI key of this box has no credit left. ..." | Top-up, or own key. |

Messages: "This activation code was already used. Ask the operator for a new one."; "The store does not know this activation code. ..."; "The store could not be reached. ... The code was not used."; "This box has no store address set. Open "Private test server (advanced)" and enter the store's address."

Not live (gaps G34, G35): the store's activation service (FAIVR F6) and the production store address (`storeOrigin` is empty in the image). Until both exist, Activate stops at the first step on a customer box.

The bootstrap code (installer) and the activation code (card) are different codes.

## 23. Phone and voice input (T20, PR #63, release `c7fabcd`)

| Label | Who | What it does | Undo |
| --- | --- | --- | --- |
| "Hold to talk" (next to Send), "Release to stop · N s", "Making text…" | Both | Records up to 60 s; the box turns it into text in the message box ("Check the text, then tap Send."). Never sends, approves or accepts. Slide off to cancel. | Edit the text. |
| "Spoken": Auto, Deutsch, English | Both | The spoken language, kept per person. | Yes. |
| "Read answers aloud", "Read aloud", "Stop reading" | Both | Reads an answer with a voice on the phone (local voices only): "No voice on this phone reads without the internet". | Yes. |
| Administration › System › "Voice input": "Voice input (speech to text on this box)" | Admin | On by default; off hides "Hold to talk" for everyone. | Yes. |

Audio goes only to the box ("Speech is turned into text on this box. The recording is deleted as soon as the text is made and is never stored."). On the remote address: "On the remote address your recording passes through Cloudflare on its way to this box." Voice works on the remote address. Activity: one line per clip, never the text. Not offered: the phone's own speech recognition (gap G36).

## 24. Update with changed permissions (T44, PR #72, release `c7fabcd`)

An upload of a new version whose permissions or questions differ shows the change once for all installs ("Adds", "Removes", new questions, and per added permission what the owner policy would do). The button reads "Update and grant (all N installs)"; nothing changes until it is pressed; the installs keep running. After the update, grants are computed as at install. Activity: who confirmed, what was added and removed. Store installs are not updated from the box (G19).

## 25. Pull requests merged after 9 October 2026 (docs part 7)

Checked against release **Truchsess 2026.10.21-84a4137** (`truchsess-iso-20261021-84a4137`, published
2026-10-21 08:23 UTC, source commit `84a4137`). Anything only on master: none (master equals this
release). Not merged when checked, and not documented: #146, #150, #151, #152, #153, #157, #160,
#161. Part 7b: #162 merged after 84a4137 and is in release **Truchsess 2026.10.21-abe4009**
(published 2026-10-21 11:26 UTC); it changes nothing a person sees, so it has one line on
/releases/ only. Part 7b pages are checked against 84a4137 (abe4009 adds only #162). Then #160
(Truchsess's own face) merged as master 4f542d0, release **Truchsess 2026.10.21-4f542d0**, the
current one; checked on 4f542d0. Then #161 (an agent's face
never goes missing) merged as master 7b0c440, checked there; its release is not out yet, so
/releases/ waits. Still not merged, not documented: #146, #150, #151, #152, #153, #157, and the
open #163 to #167.

Where every page and setting is since T102 and T103 (#141): `docs/product/settings-structure.md` on
master. In short: the menu is **Home**, **Chat**, **Agents**, **Settings** (members: Home, Chat,
Agents); **Your account** is the picture at the top right and holds **Your connections** (Email
inbox, Calendars) and **What Truchsess has learned**; **Settings** has five sections, **People**,
**Plan and costs**, **Safety copies**, **Updates**, **Your company**, and one link **Advanced (for
experts)**; **Advanced** is one page with **Agent rules**, **AI**, **Agents**, **Connections**,
**Knowledge**, **Box**, **Support access**, **Activity and audit trail**. Runs, Approvals and
Administration are gone; what waits for a person is on **Home**, **Needs you**.

### 25.1 The list

| PR | Title | For the user docs | Docs pages it touches |
| --- | --- | --- | --- |
| #77 | T51: an agent knows its limits (plain refusals, the run's limits block, blocked lines on the card) | yes | /agents/, /use/follow-a-run/ |
| #78 | T47: portal polish after the CEO's tests of 2026-10-09 | yes | many (polish) |
| #79 | T49: the installer releases old disks, the screen follows the network, every box has its own name | yes | /setup/unbox-and-connect/, /troubleshooting/ |
| #80 | T52: remote access hardening (administrator password step, member first sign-in, make-code, operator doc) | yes | /admin/remote-access/, /setup/remote-access/, /start/member/ |
| #81 | T47b: messages name the places that exist since T40 | yes | /troubleshooting/ (quoted messages) |
| #82 | T53: QEMU test that "Update now" keeps every setting of a box in real use, plus the CEO's after-update checklist | yes | /admin/updates/ |
| #83 | T54: hand-offs reach the website agent for the right website; run cards show the chain | yes | /use/follow-a-run/ |
| #84 | T56: agent answers are readable on a phone (tables as cards, no broken words, picker, placeholder, voice line) | none | none |
| #85 | T55: agents installed from the store can be updated to a new version | yes | /admin/packages/, /admin/updates/ |
| #86 | T58: CI costs less without testing less | yes | none |
| #87 | T55b: confirm a store update with installation.updated | yes | /admin/packages/ |
| #88 | T59: agents read the websites a person names; website changes go to Website care only after a person approves them | yes | /agents/website-care/, /agents/visibility-in-ai-search/ |
| #89 | T61b: company mailboxes at Microsoft 365 and Google Workspace, drafts only, never send | yes | /use/email/, /admin/company-mail/ |
| #90 | T61: members connect their company mailbox; agents read mail and write drafts, never send | yes | /use/email/ |
| #91 | T66: boxes get updates through the FAIVR store | yes | /admin/updates/ |
| #92 | Fix master: avahi-daemon active after the first boot | yes | none |
| #93 | T63: Home items: agents and the box report typed items, one API gives each person their Home | yes | /use/home/ |
| #94 | T60: the agents' browser, one read-only service on the box (company_web_render, PDF report) | yes | /agents/ (browser, PDF reports) |
| #95 | T68: installer ISO 485 MiB smaller (firmware trimmed, no manuals), size warning and change against master | yes | /setup/unbox-and-connect/ |
| #96 | T67: the portal follows its box, Restart the box, old assistant conversations put away | yes | /admin/updates/, /setup/unbox-and-connect/ |
| #97 | T69A: release signing key only in the master release job | yes | none |
| #98 | T62: Truchsess learns from how people change its mail drafts | yes | /use/email/, /use/your-account/ |
| #99 | T63b: an agent asks a person a question, and the question shows on Home | yes | /use/home/ |
| #100 | T15b-1: Ask Truchsess, the help window on every page | yes | /use/ask-truchsess/ |
| #101 | T74: every permission on every box, plain reasons, honest costs, a fresh check after an update, updates on the remote address | yes | /admin/agent-rules/, /admin/updates/ |
| #102 | T64: the Home page | yes | /use/home/ |
| #103 | T77 phase 1: code audit report (docs only) | none | none |
| #104 | T70: the memory service core (store, keyword search, write gate, run-start context, tools, backup) | yes | /use/your-account/ (what Truchsess remembers) |
| #105 | T76: lean release pipeline: parallel smokes, publish what was tested, one smoke retry, binary cache | yes | none |
| #106 | T75: one place per agent for what it may do | yes | /admin/agent-rules/, /admin/packages/ |
| #107 | T15b-1b: Ask Truchsess answers the questions people really ask | yes | /use/ask-truchsess/ |
| #108 | T87: the chat layout test's browser harness cannot hang silently | none | none |
| #109 | T86: box updates download a large closure over four connections | none | none |
| #110 | T89: master is red; the help test set covers T75's three new places | yes | none |
| #111 | T64b: the agent cards on Home, plain words on Agent rules, and "Set up your box" that collapses | yes | /use/home/, /admin/agent-rules/ |
| #112 | T88: the Agents page as cards; each person has their own agents, enforced by the box | yes | /admin/packages/, /start/roles/ |
| #113 | T57: the first store connection without surprises | yes | /setup/store-enrolment/ |
| #114 | T76 follow-up: the gate's own rule tests put no annotation on a run | yes | none |
| #115 | T76 follow-up 2: pin the runner image, re-run failed jobs works, the binary cache steps | yes | none |
| #116 | T64c: the agent card's last line in plain words, a file agent's function line, the card's money in the budget's currency | yes | /admin/packages/ |
| #117 | Update smoke: the office address probes wait for the new portal and the names service | yes | none |
| #118 | T64d: Home back to the approved design, and a visual check that keeps it there | yes | /use/home/ |
| #119 | T92: Penn answers faster, and every run shows where its time went | none | none |
| #120 | T70b: search by meaning (BGE-M3 int8 on the box, the model as a release asset) | yes | /use/knowledge/ |
| #121 | T91: when an agent cannot do a task, one plain line and one button | yes | /use/agent-needs-something/ |
| #122 | T90: a function answers as one agent; the lead routes the work to its roles | yes | /agents/ |
| #123 | T95: tests that every GitHub token stays on its own repository | yes | none |
| #124 | T93: a working AI key is never treated as switched off | none | none |
| #125 | T94: agents can work on a schedule; the first routine is Penn's new-mail check | none | /agents/ (routines) |
| #126 | T96: two CI tiers, one required check, no installer run for docs and tests | yes | none |
| #127 | T71: knowledge layer (entities, facts, pages), nightly memory maintenance with its queue, System > Memory | yes | /admin/products-and-knowledge/ (memory) |
| #128 | T97: two flaky tests made deterministic; a failed gate names its test | yes | none |
| #129 | T65: calendars, read only (iCloud, CalDAV/Hostpoint, Google, Microsoft 365) | yes | /use/calendars/ |
| #130 | Polish batch 1: send boxes, reset password, store refresh and enrolment, own name, developer messages | yes | many (polish) |
| #131 | Fix master: test_run_timeline NameError after T94 | yes | none |
| #132 | T98: a release is published only when every test suite of its commit is green | none | none |
| #133 | Polish batch 2: blank release notes, stale run-card test, test isolation, every payload test file runs in the smoke | yes | none |
| #134 | T99: agent updates on the card, Update all, many files at once, Get updates from the store | yes | /admin/packages/, /admin/updates/ |
| #135 | T73: every agent learns from people's notes and decisions | none | /use/your-account/ (learning) |
| #136 | T100: a box downloads only what changed (delta closures) | none | /admin/updates/ |
| #137 | T101: simplicity audit (documents and screenshots only) | none | none |
| #138 | T94 test: a routine checked five minutes ago never falls before the box's midnight | none | none |
| #140 | T72: Import from V1 (V1's real layout from the CEO's structure sample) | none | /admin/products-and-knowledge/ (Import from V1) |
| #141 | T102 + T103: fewer places (menu of four, Settings in five sections, one Advanced page, grouped agent needs) | yes | every page (menu and places) |
| #142 | T105: how she reaches her box, part 1 (router test page, research, design) | yes | /setup/unbox-and-connect/ |
| #143 | T104: the box works out of the box (one code on the card, prepare for shipping, the newest software after the activation) | yes | /setup/first-run/ |
| #144 | Polish batch 3: signature samples only with each person's yes, remote password on Home, connections closed, embedder refusal | yes | /use/email/, /start/member/ |
| #145 | T106: a second copy of an agent at the same price | none | /admin/packages/ |
| #147 | T107: the guided first setup (five steps to a first answer from Truchsess, included in the box) | yes | /setup/first-run/ |
| #148 | Polish batch 4: the seed test's port race, the first page's words for too many wrong codes, two free word ceilings | none | /setup/first-run/ |
| #149 | T108: updates install by themselves at night (one switch for the box and the agents, the night in her zone, what Home says, the way back) | yes | /admin/updates/ |
| #154 | T113: several company mailboxes and one private mailbox per person, one Penn | yes | /use/email/, /use/private-mailbox/, /admin/company-mail/ |
| #155 | T115: an agent asks for what it needs before it runs, not after | yes | /use/agent-needs-something/ |
| #156 | T117: the ChatGPT sign-in finishes on the box's OpenClaw and says why in plain words | none | /setup/ai-providers/ |
| #158 | T118: one Truchsess app at Microsoft; Outlook.com and Hotmail as the private mailbox | yes | /use/email/ (Coming soon only) |
| #159 | T114: the exact version on Settings > Updates, and "Newest" always says where she stands | none | /admin/updates/, /releases/ |
| #162 | T121: the update check can never roll back a night update | none (nothing a person sees) | /releases/ (one line, release Truchsess 2026.10.21-abe4009) |
| #161 | T120: an agent's face never goes missing on one box | none (the PR has no such section; its "For the CEO" names the changes) | /admin/packages/ (one line on faces, the "Installed from a file" line); /releases/ once its release is out |
| #160 | T119: Truchsess gets his own face | none (the PR has no such section; its "For the CEO" names the places) | /agents/truchsess/, /use/home/, /use/ask-truchsess/, /setup/first-run/, /releases/ (release Truchsess 2026.10.21-4f542d0) |

### 25.2 The "For the user docs" sections, verbatim

#### #77 T51: an agent knows its limits (plain refusals, the run's limits block, blocked lines on the card)

- `/agents/` and the chat: a run that tries a website the agent may not reach now says "blocked by this Truchsess's rules" on the run card. The agent's answer names the websites it may reach.
- The agent docs can mention `company-os-allowed`.

**For the agent-sources task (Gideon 1.0.1):**
- Treat a 403 with `X-Truchsess-Blocked`, or a failed lookup, as "blocked by the box" and say so.
- Never write SUPPORTED knowledge or recommendations about a site it could not open.
- Ask the user to add the website instead of guessing.
- Hand off only to agents the limits block lists as installed.
- Drop the fallback sections that imitate missing agents.

#### #78 T47: portal polish after the CEO's tests of 2026-10-09

- **Chat:**
  - The header and agent menu show the agent and lane names.
  - The agent card shows the data rule in full.
  - New hint text.
  - Run cards have a "Details" toggle for ids and models.
  - Errors are in plain words.
  - Read aloud appears only where available.
  - New runs from other devices appear by themselves.
- **Runs:** the lane column shows lane names, and the list updates by itself.
- **Approvals:** the count matches the page, member requests come first, and a sentence explains what Approve does (it records the decision and the monthly cost, and installs nothing).
- **Agents / Store:**
  - "Connected to the store on <date>", with Details.
  - The catalog appears right after connecting.
  - An untrusted publisher shows its fingerprint and a "Trust <publisher>" button (administrators only).
  - The install form lists declined permissions with a link to Owner policy.
  - Grey Install buttons say why.
  - "Apply the rules" on an installed agent.
- **Overview:** Recent activity is in plain sentences. The remote access card shows On or Off and the address.
- **People and access:** the one-time password has its own field and a Copy button.
- **Sign-in:** spaces around the e-mail or one-time password are ignored. A wrong password reminds you to copy the whole one-time password.
- **Budget:** "price unknown" instead of 0.00, lane prices, and an 80 percent warning with your own key.
- **System:** "Company name and date format" (de-CH by default).
- **Agent rules:** Owner policy can open with permissions ticked. Trusted publishers show names, with the key behind Details.
- **Activate this box:** "Private test server (advanced)" appears only when the operator has switched it on (operator docs: `company-os-operator private-store enable|disable|status`).
- **Connections:** the intro no longer mentions the internet filter's internals.

#### #79 T49: the installer releases old disks, the screen follows the network, every box has its own name

- `/setup/unbox-and-connect/`:
  - The box's screen now shows where to open it and updates by itself: "No network cable connected" until a cable is in, then the address to type, `https://<IP>/`, and the box's own name, `https://truchsess-<code>.local/`.
  - A console is on Alt+F2.
- `/setup/first-run/`:
  - Open the box at the address on its screen.
  - The first-run page shows "This box's own address: https://truchsess-<code>.local/". Bookmark that one: it stays the same when more boxes join the network.
  - `truchsess.local` opens the box too, as long as it is the only one.
  - The installer's disk step now lists what is on the disk and warns when an old disk group also spans another disk. That disk's data becomes unusable.
- Troubleshooting, new section "The box is not reachable by name":
  1. Read the address on the box's screen and type `https://<IP>/`. It always works on the same network.
  2. With two or more boxes, use each box's own name (`truchsess-<code>.local`, on its screen and on Administration > System). `truchsess.local` opens whichever box took it first; the page says so when it is another box.
  3. If no `.local` name works from a laptop on Wi-Fi but the IP does, the access point is filtering multicast ("multicast enhancement", "client isolation"). Use the IP, or turn that filter off.
  4. After the update, the browser warns once more about the certificate, once per name.

#### #80 T52: remote access hardening (administrator password step, member first sign-in, make-code, operator doc)

- `/admin/remote-access/`:
  - the switch "Allow administration on the remote address";
  - administrators enter their box password once per remote session;
  - office-only means an administrator works like a member there.
- `/setup/remote-access/`, for the operator's steps:
  - `make-code` takes the whole Cloudflare command and asks for it without echo;
  - `--out` writes a mode-600 file;
  - the policy rule "Include Emails";
  - check the Applications list;
  - delete the files after Connected.
- `/start/member/`: on the remote address, the first sign-in with the e-mail code goes straight to Chat. The temporary password is changed in the office.

#### #81 T47b: messages name the places that exist since T40

- **Agents > Store and the install form:**
  - "Add a product first" now points to Administration > Knowledge > Products.
  - A box that is not connected to the store says to connect it under Agents > Store with the one-time code.
- **Administration > Agent rules:**
  - Messages about setting up the AI point to "AI of this box".
  - The AI key and ChatGPT sign-in point to Model lanes, "Change AI provider".
  - The data rule points to "Which AI providers may see your data".
- **Administration > Backups:**
  - "No recovery key yet" and "already set up: sign in and restore" point here.
  - The restore list names the real places, each a link for an administrator.
- **Agents > Your agents:** an update that changes permissions says to review it there.
- **Activate this box:** a finished activation no longer flashes "interrupted".

#### #82 T53: QEMU test that "Update now" keeps every setting of a box in real use, plus the CEO's after-update checklist

- New page content from `docs/operations/update-check.md`, "After Update now: what to check". It belongs next to the update steps (`/admin/system/` or wherever "Update now" is documented).
- `/admin/backups/`: an update makes no backup of its own. Make one before pressing "Update now".

#### #83 T54: hand-offs reach the website agent for the right website; run cards show the chain

- **Hand-offs page:**
  - an agent hands work to a website agent only for its own website;
  - an agent without a website names the website;
  - "Website care is not installed for www.example.com" means: install Website care for that website, or hand the work over yourself;
  - when Website care is installed twice for one website, the agent asks you which one;
  - the run card shows "Handed to Website care for www.example.com → pull request example-org/example-site#12", and the child's card shows "Started by Visibility in AI search's run";
  - hand-offs that end in a pull request tell you after by default; to approve each one first, set "Hands work to other packages" to "Asks you first" in Administration > Agent rules > Autonomy levels (or press Levels on the agent's row in Agents).
- **Visibility in AI search page:** when it finds improvements for your website and Website care is installed for the same website, it hands them over; the pull request appears on its run card. It never hands work over for another website.
- **Website care page:** it takes work from other agents only for the website it was installed for, opens one pull request per change request and never merges; install it once per website.

#### #84 T56: agent answers are readable on a phone (tables as cards, no broken words, picker, placeholder, voice line)

None needed. No user page describes the message-box hints. `docs/architecture/work-chat.md` notes the touch-screen placeholder.

#### #85 T55: agents installed from the store can be updated to a new version

- **/admin/packages/ (Agents > Your agents):**
  - a card can show "Update available: <version>" with the release notes and **Update**;
  - every install moves to the new version and keeps its name, answers and files;
  - if the new version changes what the agent may do, the change is listed and the button reads **Update and grant**;
  - if an update fails, the agent keeps running its old version and the message says why; press Update again to retry;
  - members see "A newer version is available. An administrator can update it."
- **/admin/store/ (store card):**
  - Refresh, or the daily check, asks the store for newer versions of agents installed from the store;
  - updating never changes the subscription;
  - a signed file of a newer version, uploaded under Install from a file, also updates an agent installed from the store.

#### #86 T58: CI costs less without testing less

- **New page: `docs/operations/ci.md`.** It covers:
  - what CI costs and what runs;
  - the working rules that save the most: merge master into a pull request only on a conflict or when asked; check the ISO build locally before pushing image changes; merge approved pull requests back to back;
  - the recommended Actions budget: **150 USD a month with alerts at 50/75/90 %**.
- **Each installer run's job summary** now says "Build and QEMU smokes: runs" or "skipped", with the reason.

#### #87 T55b: confirm a store update with installation.updated

- **/admin/packages/ (Agents > Your agents):**
  - after an update, the box tells the store which version the agent now runs;
  - if the store has not recorded it, the agent's row says "The store has not recorded the new version yet. Removing this agent may be refused until it does." The agent keeps running on the new version;
  - the box tries again on every store refresh, and the line disappears when the store has recorded it.
- **/admin/store/:** Refresh also sends again any update the store has not recorded yet.

#### #88 T59: agents read the websites a person names; website changes go to Website care only after a person approves them

- **Websites an agent may read.**
  - An agent reads only the websites you name in your message (for example "Please review www.example.com"), together with their www. form. It reads them for this task only.
  - It can read pages but never sends anything to them: no forms, no logins, no cookies.
  - If it needs another website, a card asks you. **Allow for this task** lets it read that website until the task ends; **Not now** does not.
  - Local addresses and the box itself can never be read. The run card lists every page read under "Pages read", and you can download the result as a report (Markdown or HTML).
- **Sending website changes to Website care.**
  - When an agent has changes for one of your websites, a card lists each change with a tick box, all ticked.
  - Untick what you do not want, then press **Send to Website care**. Website care gets only the ticked changes. **Not now** sends nothing.
  - This card always appears, whatever the agent's levels say.
- **"Your websites" on the install form.**
  - Agents that review websites you name ask for no fixed website at install.
  - Instead you may list the websites your company owns, one per line. Changes go to Website care only for these.
  - You can change the list later with **Change** on the agent's row.

#### #89 T61b: company mailboxes at Microsoft 365 and Google Workspace, drafts only, never send

**Connect Microsoft 365 or Google Workspace mail** (`docs/operations/company-mail.md`)

- **Administrator, once (15 to 30 minutes):**
  - under Company mail, add each domain and choose its Mail provider: Microsoft 365, Google Workspace, or an IMAP provider;
  - for Microsoft 365, register a single-tenant app "Truchsess" in Microsoft Entra (`Mail.ReadWrite`, `offline_access`, `User.Read`; never `Mail.Send`; grant admin consent; a client secret of up to 24 months); for Google, create an Internal Google Cloud app with the Gmail API, `gmail.readonly` and `gmail.compose`, and a Web client;
  - enter the values on the card. The box reminds you 30 days before a Microsoft secret expires;
  - changing a domain's provider disconnects the mailboxes connected under the old one.
- **Person (2 minutes):** Connections > Email inbox. For a Microsoft 365 or Google domain press Connect with Microsoft or Connect with Google and sign in with your own company address; there is no password field. Drafts appear in your Drafts folder and you send them yourself. Remove disconnects. One mailbox per person.
- **Why sending is impossible:** a fixed list of allowed mail calls inside the box, no send tool for agents, and Microsoft apps with send permission are refused.

#### #90 T61: members connect their company mailbox; agents read mail and write drafts, never send

### Connect your company mailbox
1. Open **Connections > Email inbox**.
2. Enter your company email address and your mailbox password.
3. Press **Test and connect**. Truchsess logs in once to check, and saves only if that works. Your password is stored encrypted on the box and is never shown again.
4. To disconnect, press **Remove**. The password is deleted at once.

Notes:
- Only company addresses can be connected. Your administrator chooses which domains count under Administration > Connections > Company mail.
- If your administrator changes the mail server, connect again.

### What an agent can do with your mail
- **Read:** list, search and read your mail, follow a conversation, and look at what you sent. Reading never marks mail as read.
- **Draft:** write replies into your **Drafts** folder. After a task, you see how many drafts are waiting ("2 drafts in your Drafts folder"). You review them in your mail program and send them yourself.
- **Never:** send mail, delete, move or flag mail, or change folders and rules.
- **Only yours:** an agent only uses the mailbox of the person who gave it the task. Nobody else, not even the administrator, can point an agent at your mailbox or see the results of tasks that used it.
- **Instructions inside mails are ignored.** The agent treats every mail as information, never as an instruction.

#### #91 T66: boxes get updates through the FAIVR store

- A customer box needs no GitHub access for updates. Connect the box to the store (Agents > Store, with the one-time code) and "Check for updates" / "Update now" work.
- If the box is not connected to the store, the System page says: "Updates come through the store. Connect this box to the store (Agents > Store) to receive updates."
- The System page now says where a release came from: "from the store" or "from GitHub".
- "Reboot pending (new kernel)" disappears once the box has restarted.
- If a System button is refused, the reason now appears right under that button. If the page was open while the box restarted, it renews its security token by itself, or asks you to sign in again.

#### #92 Fix master: avahi-daemon active after the first boot

Nothing changes for the user. A box whose network name service hit this rare start-up race now gets its name back within seconds instead of after the next restart.

#### #93 T63: Home items: agents and the box report typed items, one API gives each person their Home

**Home (for T64's page)**
- Home shows what waits for you, today's meetings, tasks and mail, and your recent results. The number at the top is the same as the Approvals badge.
- Agents can put items on your Home: a task, a meeting, "5 e-mails drafted", a follow-up, a report or a warning. They cannot put approvals on it.
- Mark an item Done or Hide it. Drafts items leave after a day, reports and warnings after a week.
- Links that open outside the box (your webmail, a pull request, a meeting) open in a new tab.
- You see only your own items and company items. The administrator never sees your own items.

**Administrators: webmail links** (Administration > Connections > Company mail)
- Each company mail domain has a Mail provider. For Microsoft 365 and Google Workspace there is nothing more to enter.
- For an IMAP domain, optionally enter its Webmail address and Drafts folder address.
- Home then opens each person's Drafts folder from "e-mails drafted".

#### #94 T60: the agents' browser, one read-only service on the box (company_web_render, PDF report)

- **Websites an agent may read:** pages an agent opens with the box's browser are listed under "Pages read" on the run card with "with browser", plus one line on the page's parts. The same allowed websites and named-website rules apply; the browser is read only and never logs in, fills forms or downloads.
- **Run card:** "Download report (PDF)" is the first choice next to Markdown and HTML. Screenshots an agent took appear on the card.

#### #95 T68: installer ISO 485 MiB smaller (firmware trimmed, no manuals), size warning and change against master

- The installer download is about 485 MiB smaller (about 1.53 GB instead of 2.04 GB). The installed box uses about 466 MiB less disk, and its next update is that much smaller.
- Nothing changes in use. Every network card, Wi-Fi and Bluetooth chip a mini PC has is still supported.
- One exception: a mini PC with a discrete NVIDIA graphics card (rare; the box does not use one) shows its screen through the basic firmware display only.

#### #96 T67: the portal follows its box, Restart the box, old assistant conversations put away

**Restart the box**
- Administration → System → **Restart the box**. It is next to "reboot pending (new kernel)" after an update, and always under **More**.
- Confirm in the page. The box restarts and is back after about 2 minutes. The page says "Restarting. This takes about 2 minutes." and reconnects by itself.
- The restart is refused while an update, a backup or an agent run is working; the page says which. Runs that wait for an approval keep waiting and are not lost.
- Every restart is in the activity record with the name of the person who pressed it.

**The box is not reachable by name**
- The box's screen, the first-run page, the sign-in page and System show the box's address in numbers next to its name: "If the name does not open, use https://<address>/".
- Names ending in `.local` do not cross a router. If the office has two networks (for example the cable from the internet router and a Wi-Fi from a second router), a computer on the other network reaches the box only by its address in numbers.
- Fixes, any one of them:
  - use the address and bookmark it;
  - connect the computer to the box's network;
  - reserve the box's address in the router;
  - set the second router to access-point mode.
- If a page says "This address now opens another Truchsess box", it has stopped and sent nothing to that box. Open your box at the address the page shows.

**Old assistant conversations**
- Administration → System → **Old assistant conversations** shows how many messages people wrote to the removed built-in assistant, and who wrote how many. The messages themselves stay closed.
- **Open <name>'s messages** shows one person's messages. This is recorded in the activity record.
- **Download as a file** saves every message as a text file (recorded).
- **Delete these conversations** removes them for good, after a confirmation (recorded). Download them first if you need them.

#### #97 T69A: release signing key only in the master release job

No change for box users. Updates arrive, are verified and installed exactly as before; the boxes trust the same public key.

For the operator (internal, `docs/operations/ci.md`, section 8):
- **Where the key lives:** the release signing key is the secret `TRUCHSESS_RELEASE_SIGNING_KEY` of the GitHub environment `release`, deployment branches master only. Never add it as a repository secret: every pull request run then fails with "This run can read TRUCHSESS_RELEASE_SIGNING_KEY although it is not the master release job".
- **Rotating the key:** put the new key into the `release` environment (Settings → Environments → release → Environment secrets) and follow `docs/architecture/appliance-update.md`, section 3.

#### #98 T62: Truchsess learns from how people change its mail drafts

> **What Truchsess has learned** (Connections). When a mail agent writes a draft for you and you change it before sending, Truchsess notices what you changed: how you greet, how you sign off, how long your mails are, your tone. Once a day it writes that down as short lessons, and the next drafts follow them. Only you see your lessons. Undo takes back the last change, Edit puts a lesson in your own words, Delete removes it. "Remember this" on any result adds a lesson yourself. Truchsess never learns who should receive a mail, whether to send it, anything about money, payments, publishing or access, and never anything from mail other people sent you. Such things are rules your administrator sets. Your draft and sent texts are deleted after 90 days at the latest. For now, learning from your edits works with mailboxes connected by server and password (IMAP); with Microsoft 365 or Google mailboxes, use "Remember this".
>
> **Company mail standard** (every member reads it, administrators write it under Administration > Rules). Rules for every mail draft in the company, for example "We answer in the language of the customer." An agent may suggest one; it applies only after an administrator approves it.

#### #99 T63b: an agent asks a person a question, and the question shows on Home

### When an agent asks you something

Sometimes an agent needs your decision before it can go on, for example which supplier to contact first. It then asks you one short question.

- **Where you see it.** The question appears on your Home under "Needs you" as "<agent> asks: …". It counts in the number next to Approvals. The agent shows "Waiting for you".
- **How to answer.** Click "Answer in chat". The agent's chat opens at the task, with the question quoted. If the agent gave choices, click one. Otherwise, type your answer and press Send. While the agent waits, Send answers its question. To give the agent new work instead, click "Start a new task instead".
- **What happens next.** The task continues right away with your answer, in the same place in the chat. The question leaves your Home.
- **If you do not answer.** After 7 days the agent stops waiting. The task shows "Stopped: no answer", and your Home says "No answer; <agent> stopped waiting." for a day. You can give the task again at any time.
- **Who sees it.** Only you see the question and your answer. Others, the administrator included, see only that the task waits for your answer.
- **Never a password.** An agent cannot ask you for a password, a key or a code. If it needs access to a service, it says which connection your administrator should set up.
- **Waiting for an administrator.** When one of your tasks waits for an administrator's approval or check, your Home shows it with "Waiting for <name>'s approval", or "Waiting for an administrator" if your company has several. There is nothing for you to click; the task continues once it is decided.

#### #100 T15b-1: Ask Truchsess, the help window on every page

> **Ask Truchsess** (on every page, for everyone). Press "Ask Truchsess" in the left menu (on a phone: the round question-mark icon at the top) and ask about this box in your own words: what a setting does and where it is, why an agent cannot do something, which address to use, or why a run failed. Truchsess answers from this release's manual, the box's own pages and settings, and what the box knows, and it names the exact page and button. Each place it names is a link that takes you there. It changes nothing itself: you decide and press the button. When you have a run open, the question is about that run. Members get answers about their own runs, connections and agents; for company settings, keys, the budget or other people's runs Truchsess says "Ask your administrator" and gives you a text to copy. Never type a key, password or code into the help: Truchsess does not send or keep it and tells you where it belongs. If the answer is not in its sources, it says so and points to support@truchsess.com. Each answer counts in the budget as "Truchsess". Your administrator can switch the AI off under Administration > System > Ask Truchsess; the help then searches the manual and the settings, without AI.

#### #101 T74: every permission on every box, plain reasons, honest costs, a fresh check after an update, updates on the remote address

**The Agent rules page**
- Administration > Agent rules > Owner policy lists every permission this version of Truchsess knows, grouped by family. Anything new is listed under "Other" until it gets a family of its own.
- An agent under Agents > Your agents that would like a permission your rules do not allow yet says "Not allowed yet: …". Click "Open the owner policy with them ticked", check the ticks, then click "Save policy". Then click "Apply the rules" on the agent.

**Why an agent could not do something**
- When an agent could not open a website, its run card says why in one sentence:
  - the agent cannot read websites you name (another version of the agent can);
  - your company rules do not allow it yet;
  - the website is not one the agent is set up for.
- Administrators see where to change it. Members see "Ask your administrator."
- When a run failed without a result, the card shows "The agent's last message" as plain text, with links removed.

**What agents cost**
- With the managed AI, a run shows the cost the provider reported.
- With your own AI key:
  - a run shows the provider's cost when it reports one;
  - otherwise it shows an estimate from the provider's public price list, marked "estimated";
  - when neither is known, it shows "price unknown", never 0.00.
- The month's total says "at least" when some runs have no known price.

**Administration on the remote address**
- After entering your box password once, you can check for updates, update to a newer version and restart the box from outside the office.
- Secrets, SSH and rolling back can only be changed in the office, on the local address. The page says why and gives the office address.

**After an update**
- The System page checks for updates again by itself, so it no longer offers the version you just installed.
- An open page shows "A new version of Truchsess is running." Click Reload.

#### #102 T64: the Home page

### Home

Home is the first page after you sign in. Top to bottom:
- **The greeting** says how many things need you. The same number is on Approvals.
- **Needs you** lists what waits for your decision: an approval, a result to check, a website an agent wants to read, a question from an agent. Decide right in the card. These items leave Home once decided; they cannot be hidden.
- **Waiting for others** (members) lists your tasks that wait for an administrator.
- **Today** shows your meetings, your tasks (with Done and Hide; Undo brings an item back) and your mail: drafts the agents wrote, follow-ups, and warnings about suspicious mail. Agents only read mail and write drafts; they never send.
- **Your agents** shows every agent with what it is doing.
- **Recent results** lists your last finished tasks.
- **Box** (administrators) shows the last backup, updates, the budget and remote access.

Home updates by itself within a few seconds. If one part cannot be loaded, that part says so and offers what to do; the rest of Home still works.

### Your first day

On a new box, Home greets the administrator with "Let's set up your box." and a checklist of seven steps:
1. **AI ready.** Agents need the AI of this box.
2. **Recovery key saved.** Without it, a backup cannot be restored.
3. **First backup done.**
4. **First agent installed.** Choose one in the Store.
5. **Remote access.** Reach the box from your phone. Mark it "Not needed" if you only work in the office.
6. **Members added.**
7. **Members signed in.**

Each step says why it matters and opens the right page. The checklist disappears when every step is done.

### When an agent is paused or has a problem

Each agent card shows the agent's state in words:
- **Idle:** ready for work.
- **Working on:** what it is doing now.
- **Waiting for you:** something of it is in Needs you. Open jumps there.
- **Problem:** the agent cannot do its work, for example "Problem: cannot reach the mailbox". Open Connections fixes it, usually by connecting the mailbox again.
- **Paused: budget used up:** the box's AI budget for this month is used up.
  - An administrator raises it under Open Budget.
  - A member clicks "Ask your administrator". The administrators get a request on their Home, and the card shows when you asked. If the administrator keeps the budget as it is, the card tells you so. You can ask once a day per agent.

#### #103 T77 phase 1: code audit report (docs only)

none

#### #104 T70: the memory service core (store, keyword search, write gate, run-start context, tools, backup)

**What Truchsess remembers**

Truchsess keeps one memory for the company. It holds three kinds of things:
- the company's standards, set by an administrator;
- what each person taught it, from their changes to drafts and from "Remember this";
- facts agents found while working.

At the start of every task, the agent gets the company standards, your lessons, and its own lessons. If it has permission to read the memory, it also gets a few records that fit the task. Each of those is shown with its date and source, as information, not as instructions.

An agent can propose something to remember. Where it goes depends on what it is:
- About you: a fact from a normal task is kept at once, and you can undo it. A lesson waits for you.
- If the task read mail or web pages: the proposal always waits for you.
- About the whole company or a product: it always waits for an administrator.

Some things can never become a lesson: addresses, phone numbers, bank details, amounts, web addresses, and anything about forwarding, copying, sending, paying, publishing, permissions or passwords. If an agent proposes one, it goes to the administrator as a rule change request.

**Correcting or deleting what Truchsess remembers**

Open **Connections > What Truchsess has learned**.
- **Waiting for you** lists what agents proposed about you. **Keep** makes it count, **Delete** throws it away. These also show on your Home.
- Under your lessons, **Edit** changes a lesson, **Delete** removes it, and **Undo** takes back the last change.
- Only you see your personal memory. Administrators do not.

When a member leaves the company, their personal memory is deleted. Company records they created stay, marked as from "a former member".

Restoring a backup also restores the memory as it was on the backup's date. The box tells you how many memory changes would be lost and asks you to confirm.

#### #105 T76: lean release pipeline: parallel smokes, publish what was tested, one smoke retry, binary cache

Nothing changes for people using a box. Releases arrive sooner after a fix: usually about an hour after the change is merged. Every release is still tested and signed as before.

#### #106 T75: one place per agent for what it may do

**What an agent may do**
- Open an agent under Agents. "What <agent> may do" lists everything the agent asks for, in plain words, with what it may do today:
  - Allowed;
  - Allowed for this agent only;
  - Not allowed by your company rules;
  - Declined at install;
  - Needs a connection.
- **Administrators:**
  - Click "Allow for <agent>" on a line and confirm. Only this agent gets it, at once. A protected permission (publishing, sending messages, spending, credentials, deploying) asks you to tick a second line first.
  - "Remove" takes it back.
- **Members:**
  - Click "Ask to allow" on a line, or on a task that says your company rules did not allow something.
  - Your administrator sees the request on Home and under Approvals.
  - You see "Asked <name> at <time>", then their answer, on the line and on Home.

**Company rules for agents**
- Administration > Agent rules holds the defaults for every agent and every new install.
- Under a permission that one agent has for itself, it says "Also allowed for: <agent> (only this agent)", with a link to that agent.

#### #107 T15b-1b: Ask Truchsess answers the questions people really ask

**Asking Truchsess for help**

Ask in your own words, in German or English. Truchsess answers in the same language. You can name an agent ("What may Gideon do?", "Woran arbeitet Penn gerade?"). If you ask for a setting that does not exist, Truchsess says so and names the nearest real one. If it finds no exact answer, it names the three places most likely to help, then the support address.

#### #108 T87: the chat layout test's browser harness cannot hang silently

none

#### #109 T86: box updates download a large closure over four connections

none

#### #110 T89: master is red; the help test set covers T75's three new places

Nothing changes for people using the box. Ask Truchsess's test set now also asks where to allow an agent something and where to answer such a request.

#### #111 T64b: the agent cards on Home, plain words on Agent rules, and "Set up your box" that collapses

### Set up your box

While steps are open, Home shows them first, each with what to do. Steps that are done fold into one line ("6 steps done"); **Show** lists them and **Hide** folds them again. When a step only waits for your team (for example members who have not signed in yet), it says "Waiting for your team", and Home greets you as usual. When every step is done, the section disappears.

### Your agents on Home

Each card shows the agent's picture or first letter, its name and, under it, what it does for the company (the function you bought it for). The full description is under "…" > Details.

Under the name you see what the agent is doing:

- **Idle**, **Working on**, **Waiting for you** or **Paused: budget used up**, as before.
- **Problem: <reason>** says in plain words what went wrong, for example "could not read the website you named".
  - When the last task failed, **Open the task** shows it and **Ask Truchsess why** opens the help window about that task.
  - When a connection is the reason (for example the mailbox needs connecting again), **Open Connections** takes you there.

Administrators also see **This month** and what the agent cost in this budget period, the same number as Administration > Budget. When the AI provider gives no price for the agent's work, the card says **No cost recorded**.

### Agent rules

Administration > Agent rules lists what any agent may be allowed to do. Each line says in one sentence what the agent can then do, for example "The agent can read your company mail and never sends." Lines that need a value (a website, a repository, a product) say what to enter.

#### #112 T88: the Agents page as cards; each person has their own agents, enforced by the box

### Your agents

The Agents page shows your agents as cards. **Your agents** are the ones you can give tasks to. Click a card to see its settings: start a chat, its recent tasks, what it may do, the connections of yours it uses, and what it has learned about how you work. **Remove from my agents** takes it off your list. You can add it again later.

### Adding an agent

**More agents on this box** shows the other agents your company has. **Add this agent** adds one to your agents. Some agents need an administrator's OK first: then the card says "Asked Ben at 09:12", and you see the answer on Home. You can ask once a day per agent. Adding an agent costs you nothing; the company pays for its agents.

### For administrators

You can use every agent. Your own cards are the agents in your list, and you add any agent directly. Each card's settings show **Who uses this agent**, where you add or remove people, and the switch **Members may add it without asking** (off unless you switch it on). When a member asks for an agent, **Allow** or **Not now** are on Home and under Approvals. In a card's **What it may do**, **Allow for** gives one permission to that agent only; members ask with **Ask to allow**, and their asks wait under Approvals > Requests to allow. An agent you install is added to your own list; others add it themselves or you add them. **Install from the store** (top right on Agents) opens the store and the box's agents with Update, Change and Remove.

### Functions with several agents

Some functions from the store have several agents that work together, for example Bob for software delivery. They show as one card. Its settings list the agents by their role; start a chat with the one you need, and see what each may do. You add, remove and allow them together, as the store sells them as one.

### When an agent hands work to another agent

If an agent wants to hand work to an agent that is not in your list, nothing is handed over; Home asks you to add that agent, or to put the question aside.

An agent's hand-offs are one line under "What it may do", naming the agents it can hand work to. **Allow all hand-offs** allows them at once; **Details** shows each one with its own Allow. An agent that is not installed on your box is marked "not installed".

#### #113 T57: the first store connection without surprises

**Connecting the box to the store**
- Under Agents, Store, enter the one-time code the publisher gave you. The box connects and shows what your store account offers, without another click.
- If nothing is offered yet, it says "Your store account has no agents yet". When the publisher offers one, press Refresh catalog.
- If the store cannot be reached, it says so in plain words. Press **Try again** once the box is online.
- If the store offers agents from a publisher this box does not trust yet, compare the fingerprint, then press **Trust <publisher>**. You can undo this under Agent rules, Trusted publishers; the card takes you there.
- Press **Install** once. The button shows "Installing …" until the agent is ready, and the agent's row then says **Installed**.
- An agent from the store is installed once per box. If it is already installed, the card says so in one sentence; uninstall it first to install it again.
- After you subscribe and pay, the page checks every few seconds. With two subscriptions at once, both are followed. A payment page not completed within a day is no longer followed; subscribe again.

**Install from a file**
- Agents you installed from a file before connecting the store stay as they are, "Installed from a file", with their name, answers and work.
- Connecting the store does not replace them, even if the store sells the same agent.

#### #114 T76 follow-up: the gate's own rule tests put no annotation on a run

Nothing changes for box users. For whoever reads the Actions page: a green run shows no error annotations. If one shows, it is real.

#### #115 T76 follow-up 2: pin the runner image, re-run failed jobs works, the binary cache steps

Nothing changes on a box. For whoever keeps CI:
- The runners stay on Ubuntu 24.04 until we move on purpose (docs/operations/ci.md 9.11).
- After a failed installer run, "Re-run failed jobs" re-runs just the failed smoke.
- The binary cache is off until the CEO's ten steps in 9.6 are done. Each message a run prints about it names the one setting to fix.

#### #116 T64c: the agent card's last line in plain words, a file agent's function line, the card's money in the budget's currency

- **Agent cards, last line.** Under the status, a card says when the agent last finished a task and what was asked, for example "Last task finished 13 Oct: Check example-bakery.ch". While it works, the tag says "Working on: ..."; when the last task failed, the card says why and offers "Open the task" and "Ask Truchsess why". It never shows the agent's own reply; open the task or Recent results for that.
- **Agents installed from a file** show the store function their package belongs to, or the package's own title.
- **Technical details** (administrators): package and install ids are under "Technical details" in the store view and in the install form.
- **Costs per agent** on the Budget page and on the cards are in your budget's currency, converted with the billing rate on the Budget page.

#### #117 Update smoke: the office address probes wait for the new portal and the names service

Nothing changes on a box. For whoever reads an update-smoke log: the line "office address probes: ..." shows which release and which state of the office names the address checks saw.

#### #118 T64d: Home back to the approved design, and a visual check that keeps it there

- **Home** looks like the approved design again: framed cards with corner marks, a line under each heading and "See all" beside it.
- **Recent results** shows one line per result (what is ready, which agent, what kind, when) and a Download button for reports. It never shows the agent's raw reply.
- **The Box tiles** show the budget as "CHF used of CHF budget" with a bar, mark a backup older than 7 days "Too old", and each tile opens its page.
- **Your agents** shows up to eight cards. "See all N agents" opens the Agents page.

#### #119 T92: Penn answers faster, and every run shows where its time went

none

#### #120 T70b: search by meaning (BGE-M3 int8 on the box, the model as a release asset)

Truchsess finds what you mean, not only the words you type. Ask "what does our small plan cost" and it finds the page that says "Unexia Pro, CHF 49". This works in German and English and runs entirely on your box: nothing is sent anywhere to be indexed.

After a new install, the box downloads its search model once (about 560 MB) a few minutes after it starts. Then it reads through your company memory in the background. **System** shows the progress under "Search by meaning". Until it says "on", search works with the exact words, as before. If the download fails, System says why and the box tries again by itself.

#### #121 T91: when an agent cannot do a task, one plain line and one button

**When an agent cannot do a task**
- The task shows **Needs something** with one sentence under the agent's answer and one button.
- **Ask the administrator.** The administrator sees your request on Home with what happens if they accept. Your task shows "Asked <name> at <time>", then their answer.
- **Give the task to <agent>.** Another of your agents can do it. After one confirmation it gets the same request and attachments as a new task.
- **Connect your mailbox.** Opens Connections. Run the task again afterwards.
- **For administrators:**
  - **Allow for <agent>** allows that one permission for that agent only.
  - **Open in Store** shows the Store function that can do it.
  - On a member's request, **Accept** takes you to the Store function or to Connections; **Not now** tells the member.

#### #122 T90: a function answers as one agent; the lead routes the work to its roles

- **Talk to the function, not its roles.** Bob (Software delivery) is one entry in Chat. Write your task to Bob; Bob decides which of his roles takes it, and can hand it to several in turn. You get one answer from Bob.
- **What happened on the way.** With Bob's answer, the run shows the chain ("Bob → QA Reviewer → Merge Gate"), what each role did and what it cost, and the total.
- **Approvals stay.** A role that would change a repository (for example merging a pull request) still waits for your approval.
- **Administrators:** Bob's settings on the Agents page have "Test this role alone" for each role. The Budget page lists Bob's tasks as one line each, with the chain and its cost.
- **One lead per function.** A store function has one lead. Installing a second one is refused with a sentence that names the first.

#### #123 T95: tests that every GitHub token stays on its own repository

Nothing changes on a box. For the dev-box setup: each agent's GitHub access is limited to the repositories and permissions shown on its page under Agents. An agent that may change code writes only to its own `truchsess/<install>/` branches and opens pull requests from them; it never pushes to a main branch or merges.

#### #124 T93: a working AI key is never treated as switched off

none

#### #125 T94: agents can work on a schedule; the first routine is Penn's new-mail check

none

#### #126 T96: two CI tiers, one required check, no installer run for docs and tests

No change for people using a box: the image only leaves out unit tests and the services' README files, which nothing on the box reads.

For the team (docs/operations/ci.md, section 11):
- A pull request shows `build-and-smoke-installer: action required` until the label `full-ci` is added.
- Add `full-ci` when the review is done, after the last master merge, and merge soon after. Master then publishes without testing again.
- Docs-only and test-only pull requests need no label. They pass in about a minute.

#### #127 T71: knowledge layer (entities, facts, pages), nightly memory maintenance with its queue, System > Memory

- **System > Memory** (administrators): shows how the company memory is doing. It lists:
  - how many records of each kind;
  - whether search by meaning is on;
  - how fast search was over the last day;
  - the last nightly check and its test score;
  - the database size;
  - the last backup that holds the memory.

  Below that are the **memory checks**: things Truchsess found and cannot decide alone, such as two different addresses for one customer, a fact due for review, or a likely duplicate. Each check has the buttons that fit it: Keep, Replace, Merge, Delete or Confirm. Nothing is deleted unless a person chooses it.
- **Check now** runs the nightly check at once. It takes seconds.
- **Each figure on System > Memory** says OK, Needs a look or Needs action, with one sentence on why and a button to the place that fixes it (for example "No backup holds the memory yet" leads to Backups).
- **Knowledge pages:** one page per customer, contact, product or supplier, made from what Truchsess knows. Each fact is a line. Edit changes the fact itself, so search, Ask Truchsess and the agents use the new value at once; the old value stays in the history. Delete removes a line, and Undo brings it back. Add a fact adds a new line. Notes hold free text that is not a fact; if a later fact changes a value the notes still mention, a check asks whether to update the notes. An administrator edits company pages; a member edits only their own.
- **Members** find their own checks and pages under Connections > What Truchsess has learned, and under "Everything in your memory" all their own records: Edit, Delete, Undo, and Download for one file of all of it. Nobody else sees them.
- **Home** shows one line per kind of check, for example "3 memory facts are due for review", with a Check button.
- **The nightly check** runs at 03:00. It fixes only safe things by itself: it indexes missing records and merges exact copies.
- **Where the knowledge comes from:** in this release, mostly from the V1 import (next task). A person corrects or adds a fact on its page, or answers its check.

#### #128 T97: two flaky tests made deterministic; a failed gate names its test

No change for people using a box. For the team, docs/operations/ci.md section 12: when the gate's own tests fail, the run's summary and the pull request's check now say which test failed and "Re-run failed jobs, or fix the test", instead of "fast tier passed, full tier needed".

#### #129 T65: calendars, read only (iCloud, CalDAV/Hostpoint, Google, Microsoft 365)

**Connect your calendars**

- **Where:** Connections > Calendars > Add calendar. You can connect several calendars from different providers.
- **Apple iCloud:**
  1. Sign in at account.apple.com.
  2. Open Sign-In and Security, then App-Specific Passwords.
  3. Generate a password named Truchsess.
  4. Enter your Apple Account e-mail and that password. Your normal Apple password never goes into the box.
- **Hostpoint and other hosters (CalDAV):** enter the server (for Hostpoint `caldav.hostpoint.ch`), your user name (for Hostpoint your e-mail address) and your password.
- **Google and Microsoft 365:** press the button and sign in on Google's or Microsoft's own page. Your administrator sets these up first under Administration > Connections > Company mail.
- **Choosing calendars:** tick the calendars you want Home and your agents to see, then Save.
- **What you get:**
  - Home shows today's and tomorrow's meetings and keeps them up to date every 15 minutes;
  - an agent you give a task can see your meetings and when you are free.
- **What agents can never do:** create, change, accept or decline anything in your calendars.
- **Privacy:** only you see your calendars.
- **Remove** deletes the box's access at once.

#### #130 Polish batch 1: send boxes, reset password, store refresh and enrolment, own name, developer messages

- Ask Truchsess and Chat: what you type leaves the box when you send it; if it cannot be sent, it comes back with the reason, so you can send it again.
- Agents, Store, **Refresh catalog**: the button shows "Refreshing…", then "Catalog refreshed at <time>" next to it, or what went wrong and what to do.
- Connecting the box to the store: after the code is accepted, the page shows "Starting the store connection on this box…" for a few seconds, then the result. A trusted publisher shows as trusted straight away.
- Administration, People and access, **Reset password**: the one-time password opens in a small window with **Copy** and **Done**. It is shown only once: copy it before you press Done.
- After an update the box keeps its own address (truchsess-xxxx.local); an open page does not jump to truchsess.local while the box restarts.

#### #131 Fix master: test_run_timeline NameError after T94

Nothing changes for users.

#### #132 T98: a release is published only when every test suite of its commit is green

none

#### #133 Polish batch 2: blank release notes, stale run-card test, test isolation, every payload test file runs in the smoke

- Agents, Store: when an agent's new version comes with empty release notes, the update offer shows the version and the Update button without an empty notes box.
- Nothing else changes for users. Items 2 to 4 are tests and CI.

#### #134 T99: agent updates on the card, Update all, many files at once, Get updates from the store

- When a newer version of an agent is ready, its card on the Agents page says **Update available**, with the new version and one line on what is new. The Agents menu entry shows how many updates wait, and Home shows one line.
- Press **Update** on the card, or **Update all** at the top to update every waiting agent at once. If a new version may do something more, a small window says what in plain words. Nothing changes until you press **Allow and update**. **Not now** leaves the agent on its version.
- Each agent's name, answers, files and history stay when it updates. If one agent cannot be updated, the others still are, and that agent keeps running on its old version.
- An agent you installed from a file: open **Store and files**, press **Choose files** and select all the files you got at once. Each file gets one line: which agent it updates, "Already up to date", or why it cannot be used. Press **Update all from these files**.
- **Get updates from the store**: when your store subscription sells an agent you installed from a file, its card offers this once. From then on that agent gets its updates from the store like the others. Its name, answers, permissions, files and history stay.
- If an agent's card says it cannot reach something (for example a repository), the agent still updates and keeps running. Use the buttons on that line to add the repository to your GitHub connection or to choose another one. If a new version asks a new question, the card asks it with **Answer**. Only the work that needs the answer waits.

#### #135 T73: every agent learns from people's notes and decisions

none

#### #136 T100: a box downloads only what changed (delta closures)

none

#### #137 T101: simplicity audit (documents and screenshots only)

None. This is an audit, not a product change.

#### #138 T94 test: a routine checked five minutes ago never falls before the box's midnight

none

#### #140 T72: Import from V1 (V1's real layout from the CEO's structure sample)

none

#### #141 T102 + T103: fewer places (menu of four, Settings in five sections, one Advanced page, grouped agent needs)

- **The menu:** Home, Chat, Agents, Settings (members: Home, Chat, Agents). Your account is the picture at the top right.
- **Settings has five parts:** People, Plan and costs, Safety copies, Updates, Your company. Everything for experts is behind "Advanced (for experts)" at the end of Settings.
- **Updates** names each update by its month ("October 2026 update") and says how much it downloads ("2.2 MB to download, only what changed").
- **Approvals is gone:** everything that waits for you is on Home under "Needs you".
- **Who may use an agent:** set it on the agent's card. Choose Everyone, or these people.
- **When an agent cannot work:** the card shows one line, for example "Bob cannot reach the repository Assetto." Fix it there or under Home > Needs you, and the fix applies to all of Bob's agents that need it.
- **A new box starts ready:** agents may do everyday work and run on a schedule, and everyone sees the products. Nothing that costs money or sends something happens without your yes.
- **Where things went:** the table in `docs/product/settings-structure.md` lists every old place and its new one.

#### #142 T105: how she reaches her box, part 1 (router test page, research, design)

Nothing changes for the customer yet. When part 2 ships, the user docs get:
- "Scan the QR code on your box";
- "Box found, online";
- the one paragraph on what passes through Truchsess (box-reach.md, section 6);
- the optional router step for a FRITZ!Box ("make it faster in the office").

#### #143 T104: the box works out of the box (one code on the card, prepare for shipping, the newest software after the activation)

- **The card in the box:** open the address on the card (or scan the QR code), create your account, and type the code from the card once. The box activates itself and gets the newest software; this takes about 20 minutes in all.
- **Time zone:** the first page takes your browser's time zone; change it there or later under Settings > Your company. Safety copies, update checks and routines run on that time.
- **The box's screen** shows its name, its address and a QR code. Nobody signs in at the box itself.
- **If the newest software cannot be installed,** the box keeps the software it has; install it later under Settings > Updates.

#### #144 Polish batch 3: signature samples only with each person's yes, remote password on Home, connections closed, embedder refusal

- **Company signature:** an administrator's task that sets the company signature reads only the administrator's own sent mail.
  - Everyone else is asked once on Home: "Share your mail signature with the company?".
  - Only the closing lines of the last 5 sent mails are read, never the mails themselves.
  - Change your answer under Your account > Email inbox.
- **From outside the office:** an administrator enters the box password once, on Home, to manage the box. Until then they work as a member.

#### #145 T106: a second copy of an agent at the same price

none

#### #147 T107: the guided first setup (five steps to a first answer from Truchsess, included in the box)

- **Set up your box** (new page): the five steps with the 360 px pictures (`docs/screenshots/t107/0-welcome-360.png` to `6-done-360.png`), what each step needs (the card, about ten minutes, a printer or a place to save a file), and that nothing in the setup costs money.
- **Your recovery sheet**: what it is for, where to keep it, how to bring the data back onto a new box ("I am moving from another Truchsess box").
- **Truchsess, included in your box**: what it answers, the starter credit (the amount the activation brought), where it is (Home, Agents, Chat).
- Remove the "Set up your box" checklist from the Home page's description.

#### #148 Polish batch 4: the seed test's port race, the first page's words for too many wrong codes, two free word ceilings

none

#### #149 T108: updates install by themselves at night (one switch for the box and the agents, the night in her zone, what Home says, the way back)

- **Updates at night:** with Settings > Updates > "Install updates automatically" on, your box and your agents update at night, between 02:00 and 05:00 your time. A new box has it on.
- **If an update does not start correctly,** the box goes back to the previous version by itself, and Home tells you the next morning. Nothing is lost. That update is not tried again the next night.
- **An agent that would get new permissions** is never updated at night. Home asks you first, one agent at a time.
- **With the switch off,** or when the box was off at night for a week, Home shows "An update is ready" with Update now. An update that fixes a security problem is marked and reminds you once after 14 days.
- **Existing boxes** keep updating by hand until an administrator answers the question on Home.

#### #154 T113: several company mailboxes and one private mailbox per person, one Penn

## For the user docs: a private mailbox

**Add it.** Your account > Email inbox > **Add a private mailbox (only you)**. Type your address. For Gmail:
1. Open myaccount.google.com/security and turn on 2-Step Verification.
2. Open myaccount.google.com/apppasswords.
3. Type a name, for example Truchsess, and press Create.
4. Copy the 16 characters Google shows.
5. Paste them into the App password field and press "Let Penn read your private mailbox. Only you will see it." Type the app password only there, never into a chat.

For an address at your own domain, choose where its mail is (Hostpoint, Infomaniak, cyon, METANET, green.ch, Swisscom, or Gmail / Google Workspace), then type its password.

**One per person, only you.** You can connect one private mailbox. Only you and the tasks you give can use it. Administrators never see its address, its mail or its drafts; they only see that a private mailbox was connected or removed, and by whom. It never goes into company knowledge, company lessons or the company signature. Drafts in it get no company signature. Its mail is marked "private" in your digest and on your Home.

**Cannot be connected.** Proton Mail (end-to-end encrypted; only Proton Mail Bridge on your own computer can read it). Outlook.com and Hotmail (Microsoft allows them only through its own sign-in).

**For administrators.** Free-mail domains such as gmail.com can never be company domains. A company that uses free-mail addresses as its company mail lists them one by one under Settings > Advanced > Connections > Company mail > Company mailboxes by address, each with its person. If you change a domain's mail server, the people with a mailbox there see "Connect again" on their Home. Plan and costs shows one line for all private mailboxes together. It is included in the box's AI budget and Penn's price.

## For the user docs: a Google Workspace domain

1. The administrator opens Settings > Advanced > Connections > Company mail, adds the domain, picks "Gmail or Google Workspace (IMAP, app password)" and saves.
2. Each person turns on 2-Step Verification in their Google account, then creates an app password at myaccount.google.com/apppasswords.
3. In Your account > Email inbox, they type their address (the server appears by itself), paste the app password and press Test and connect.
4. If the Google Workspace administrator has switched off app passwords, the test fails with Google's answer; switch them on in the Google Admin console.

## For the user docs: a second company mailbox

**Add it.** Your account > Email inbox > **Add another company mailbox**. Type the address. For the company's own mail server, type its password and press "Test and connect"; for Microsoft 365 or Google Workspace you sign in on their page. Only addresses at the company's mail domains can be connected, and never another person's.

**What changes for you.** Your agent works on all of your company mailboxes as one inbox. The digest shows each mail with the address it came to. A reply is always written in the mailbox the mail came to, with that domain's company signature, and lands in that mailbox's Drafts. For a new mail it asks you once which mailbox to use. Nothing is ever sent: you send each draft yourself.

**What stays the same.** What the agent learns about how you write is the same for all of your mailboxes. Only you and the tasks you give can use them; the administrator never reads your mail. Each mailbox has its own Disconnect; disconnecting one leaves the others working.

**For administrators.** Company mail domains are set where they were (Settings > Advanced > Connections > Company mail). With two or more domains, Settings > Advanced > Learning lets you add a standard (for example the signature) for one domain's mailboxes. It is included in Penn's price.

#### #155 T115: an agent asks for what it needs before it runs, not after

**The first time with Penn**

When you open Penn for the first time, Penn tells you what it still needs before you type anything, for example "Penn cannot read your mailbox yet.", with one button: **Let Penn read your mailbox**.

One click does everything that is missing:
- it records your own yes (only you can give it for your mailbox);
- if you are an administrator, it allows mailbox reading for Penn on this box;
- if your mailbox is not connected yet, it opens the Email inbox page, where you connect it as usual.

If you already typed a request, it waits ("Your request waits: ...") and runs by itself as soon as Penn can.

Nothing runs and nothing is charged while something is missing. No answer and no file is made. A colleague cannot say yes for your mailbox, and you cannot say yes for theirs. If your company has not allowed mailbox reading yet, the button asks your administrator.

Penn reads mail for you only after you have connected your own mailbox. That holds for every task you give it, even one that does not need your mail.

Repositories (Bob) and websites (Gideon) work the same way: the line says what is missing, and an administrator chooses it.

#### #156 T117: the ChatGPT sign-in finishes on the box's OpenClaw and says why in plain words

none

#### #158 T118: one Truchsess app at Microsoft; Outlook.com and Hotmail as the private mailbox

**Connect your Microsoft mailbox.** In Your account (your picture, top right) > Email inbox, type your work address and press Connect with Microsoft. You sign in on Microsoft's own page; Truchsess never sees your password. Agents read your mail and write drafts; they never send. An Outlook.com or Hotmail address can be your one private mailbox: use Add a private mailbox (only you).

**Your IT must approve Truchsess once.** Some companies let only their IT approve new apps. Then Truchsess says "Your company's IT must approve Truchsess once." Press Copy the approval link for your IT and send the link to your IT. After they approve, connect again.

Confidence: 0.85 against the stub and Microsoft's documentation. The real-tenant behaviour waits on the return page going live.

#### #159 T114: the exact version on Settings > Updates, and "Newest" always says where she stands

none
