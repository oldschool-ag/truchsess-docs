// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightLinksValidator from 'starlight-links-validator';

// The page addresses below are a contract: the FAIVR store docs link to them.
// Never rename or remove one without adding a redirect in `redirects` (see CONTRIBUTING.md).
export default defineConfig({
  site: 'https://docs.truchsess.com',
  trailingSlash: 'always',
  redirects: {
    // Example of a redirect after a rename, kept as a pattern for maintainers:
    // '/setup/old-address/': '/setup/new-address/',
  },
  integrations: [
    starlight({
      title: 'Truchsess',
      description: 'The manual for administrators and members of a Truchsess box.',
      // No analytics and no trackers: nothing is added to `head` beyond what Starlight renders.
      editLink: {
        baseUrl: 'https://github.com/oldschool-ag/truchsess-docs/edit/main/',
      },
      social: [
        { icon: 'github', label: 'Source of this manual', href: 'https://github.com/oldschool-ag/truchsess-docs' },
      ],
      lastUpdated: false,
      plugins: [
        // Fails the build on a broken internal link or a missing anchor.
        starlightLinksValidator({ errorOnRelativeLinks: false }),
      ],
      sidebar: [
        { label: 'Start here', link: '/' },
        {
          label: 'Start',
          items: [
            { label: 'Your first day as a member', slug: 'start/member' },
            { label: 'Roles: who can do what', slug: 'start/roles' },
            { label: 'Glossary', slug: 'start/glossary' },
          ],
        },
        {
          label: 'Setup (administrator, in order)',
          items: [
            { label: '1. Unbox and connect', slug: 'setup/unbox-and-connect' },
            { label: '2. First run and activation', slug: 'setup/first-run' },
            { label: '3. AI providers', slug: 'setup/ai-providers' },
            { label: '4. Budget', slug: 'setup/budget' },
            { label: '5. Members', slug: 'setup/members' },
            { label: '6. Connections', slug: 'setup/connections' },
            { label: '7. Store enrolment', slug: 'setup/store-enrolment' },
            { label: '8. First agent', slug: 'setup/first-worker' },
            { label: '9. Backup', slug: 'setup/backup' },
            { label: '10. Remote access', slug: 'setup/remote-access' },
          ],
        },
        {
          label: 'Daily use',
          items: [
            { label: 'Start a task', slug: 'use/start-a-task' },
            { label: 'Follow a run', slug: 'use/follow-a-run' },
            { label: 'Use it on your phone', slug: 'use/phone-and-voice' },
            { label: 'Approvals and checks', slug: 'use/approvals-and-checks' },
            { label: 'Knowledge', slug: 'use/knowledge' },
            { label: 'Workboard', slug: 'use/workboard' },
            { label: 'Report a problem', slug: 'use/report-a-problem' },
            { label: 'Your account', slug: 'use/your-account' },
          ],
        },
        {
          label: 'Administration',
          items: [
            { label: 'Agent rules explained', slug: 'admin/agent-rules' },
            { label: 'People and access', slug: 'admin/users' },
            { label: 'Administrator password', slug: 'admin/administrator-password' },
            { label: 'Install and manage agents', slug: 'admin/packages' },
            { label: 'Store', slug: 'admin/store' },
            { label: 'Products and knowledge', slug: 'admin/products-and-knowledge' },
            { label: 'AI providers and lanes', slug: 'admin/ai-providers-and-lanes' },
            { label: 'Budget', slug: 'admin/budget' },
            { label: 'Connections', slug: 'admin/connections' },
            { label: 'Autonomy levels', slug: 'admin/autonomy-levels' },
            { label: 'Backup and restore', slug: 'admin/backup-and-restore' },
            { label: 'Updates', slug: 'admin/updates' },
            { label: 'Remote access', slug: 'admin/remote-access' },
            { label: 'Audit and status', slug: 'admin/audit-and-status' },
          ],
        },
        {
          label: 'Agents in the store',
          items: [
            { label: 'All agents', slug: 'workers' },
            { label: 'Software delivery', slug: 'workers/software-delivery' },
            { label: 'Product ownership', slug: 'workers/product-ownership' },
            { label: 'Website care', slug: 'workers/website-care' },
            { label: 'Design review', slug: 'workers/design-review' },
            { label: 'Marketing planning', slug: 'workers/marketing-planning' },
            { label: 'Strategy and challenge', slug: 'workers/strategy-and-challenge' },
            { label: 'Pricing and business models', slug: 'workers/pricing-and-business-models' },
            { label: 'Visibility in AI search', slug: 'workers/visibility-in-ai-search' },
            { label: 'LinkedIn posting (planned)', slug: 'workers/linkedin-posting' },
          ],
        },
        { label: 'Not possible yet', slug: 'not-yet' },
        { label: 'Troubleshooting', slug: 'troubleshooting' },
        { label: 'Releases', slug: 'releases' },
      ],
    }),
  ],
});
