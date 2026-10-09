# Content inventory

What an administrator or a member of a Truchsess box can see and do, read from the Truchsess
source. Every page of the manual is written from this list. When the box changes, this list
changes first, then the pages.

## How this list was made

- **Checked against:** box release `truchsess-iso-20261009-8551c68` (published 2026-10-09, source commit
  `8551c68`) for the office address (T43, PR #70); it adds nothing else people see except an
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

| # | Area | Gap | Workaround today | Who to ask |
| --- | --- | --- | --- | --- |
| G3 | Accounts and roles | A second administrator, or making a member an administrator. | Share administration tasks by asking the one CEO administrator. | Support. |
| G5 | Accounts and roles | Limit which agents a member sees in Chat. | Every member sees every installed agent. Install only agents everyone may use. | Administrator. |
| G6 | Accounts and roles | See other people's runs as a member, or share a run. | Members see own runs only. Share the result file or text another way. | Administrator (sees all runs). |
| G7 | Approvals and autonomy | Approve or refuse as a member, or as a product owner. | Only the CEO administrator decides. | Administrator. |
| G11 | Knowledge, workboard and products | See, search or edit the company knowledge in the portal, or look at older revisions. | Ask an agent with knowledge permission to search, read or quote a document (it can also read an older revision). | Administrator. |
| G12 | Knowledge, workboard and products | Delete a knowledge document. | Import a corrected version (it becomes the current one). A document cannot be removed. | Support. |
| G13 | Knowledge, workboard and products | See the workboard in the portal. | Ask an agent with workboard permission to list or update cards in a task. | Administrator. |
| G14 | The box | Report a problem from the portal. | Use "Copy logs" (installer) or the run's "Audit" and "Details (update log)"; send them with a description to support. | Support. |
| G15 | Knowledge, workboard and products | Withdraw a request. | Deny pending requests. Products can be renamed, archived and restored; nothing is deleted. | Administrator. |
| G16 | Knowledge, workboard and products | An approved request for another agent installs it. | Approval only records the request. The administrator installs the agent under Agents. | Administrator. |
| G17 | Agents and the store | Install the same store package twice. | A store package installs once per box. A sideloaded package (signed file) can be installed several times. | Support. |
| G18 | Agents and the store | Roll back an agent to an earlier version. | Not offered. Uninstall and install the earlier signed file (the workspace is lost). | Support. |
| G19 | Agents and the store | Store updates for store installs. | "Update all installs" works for uploaded package files only. | Support. |
| G20 | Agents and the store | Leave the store (undo enrolment). | Not offered in the portal. Cancel every subscription. | Support. |
| G21 | The box | Change the box's name or address (always `truchsess.local`; `myai.local` also works). | None. | Support. |
| G22 | The box | Automatic updates. | The box looks for a new release every day, but it installs only when the admin presses "Update now". | Administrator. |
| G23 | The box | Choose the backup time or how many backups are kept, or back up to another place automatically. | Backups run at 03:30 and 7 are kept. Download a backup and keep it elsewhere. | Administrator. |
| G24 | The box | A model running on the box ("On this box only"). | No local model ships yet; this choice refuses every run. Use PHOENIQS (Switzerland) for "Switzerland only". | Administrator. |
| G25 | Tasks | Images, PDFs or other binary files as task attachments. | Text files only, up to 48 KB. Put a link in the message instead. | Administrator. |
| G26 | The box | Remote sign-in for secrets (passwords, keys, updates, knowledge import). | Do these in the office on the local address. | Administrator. |
| G27 | Agents and the store | The LinkedIn posting agent. | Planned, not in the store yet. | Support. |
| G28 | Agents and the store | Change the owner policy for an already installed agent. | Use "Change" for the install questions, or uninstall and install again. | Administrator. |
| G29 | Approvals and autonomy | Notifications (e-mail or chat) when an approval or a check waits, or a run ends. | Open Approvals (the navigation shows how many wait; panels "Waiting for your decision" and "Tells you after") or the run card. | Administrator. |
| G30 | The box | A language other than English in the portal. | None. | Support. |
| G31 | The box | Show the certificate fingerprint on the very first screen. | Read it on the box's console (screen and keyboard) after the automatic login. | Support. |
| G32 | Approvals and autonomy | A different autonomy level for one install of a package. | A level applies to every install of the package. Install a separate package if you need different levels. | Administrator. |
| G33 | Approvals and autonomy | Approve a repository comment, issue or push before it happens. | Repository actions can be raised to "Waits for your check" only. To approve each change, remove the repository permission and ask the agent to describe the change in its answer. | Administrator. |
| G34 | Activation and AI | Activate the box with the activation code from the card (it would enrol the box and deliver the managed AI). | The store's activation service is not live yet, and a new box has no store address. Choose "Use my own AI key instead" at the first run, or later "Change AI provider" under Administration › Agent rules. | Support. |
| G35 | Activation and AI | The one-time starter credit of CHF 50. | It comes only with an activation. With your own key, set your own budget under Administration › Budget. | Support. |
| G36 | Tasks | Speech recognition by the phone itself (Apple or Google). | Use "Hold to talk": the box turns speech into text, and the audio stays on the box. | Administrator. |

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
