export type Language = 'en' | 'ja';

export interface ModuleItem {
  id: string;
  number: string;
  v1Badge?: boolean;
  eyebrow: { en: string; ja: string };
  title: { en: string; ja: string };
  summary: { en: string; ja: string };
  bullets: { en: string[]; ja: string[] };
  screenshot: string;
  secondaryScreenshot?: string;
  screenshotCaption: { en: string; ja: string };
  liteIncluded: boolean;
  liteNote?: { en: string; ja: string };
  proIncluded: boolean;
  proNote?: { en: string; ja: string };
}

export const SCREENSHOTS = {
  dashboard: './assets/aistudio/extracted/dashboard.jpg',
  projectsPeople: './assets/aistudio/extracted/projects-people.jpg',
  agendaHfr: './assets/aistudio/06-agenda-builder_88f527e7.png',
  agendaPl27: './assets/aistudio/extracted/agenda-pl27.jpg',
  carryForward: './assets/aistudio/07-carry-forward-preview_4bd453e1.png',
  liveMinutesHfr: './assets/aistudio/08-live-minutes_223c467b.png',
  liveMinutesPl27: './assets/aistudio/extracted/live-minutes-pl27.jpg',
  attendance: './assets/aistudio/09-attendance_f0b1a1b6.png',
  approveDialog: './assets/aistudio/10-approve-dialog_ca5d2256.png',
  pdfPage1: './assets/aistudio/extracted/minutes-pdf-page1.jpg',
  pdfPage4: './assets/aistudio/extracted/minutes-pdf-page4.jpg',
  tasksBoard: './assets/aistudio/extracted/tasks-board.jpg',
  decisionsLog: './assets/aistudio/extracted/decisions-log.jpg',
  searchCtrlK: './assets/aistudio/extracted/search-ctrl-k.jpg',
  reminders: './assets/aistudio/extracted/reminders.jpg',
  logo: './assets/aistudio/SGB_LOGO_a8573129.png',
  introVideo: './assets/aistudio/SGB_short_video_3eb55aaa.mp4',
  webStyleRef: './assets/aistudio/web_style_c1e9f472.jpg',
};

export const MODULES: ModuleItem[] = [
  {
    id: 'projects-people',
    number: '01',
    eyebrow: { en: 'MODULE 01 · DIRECTORY & GOVERNANCE', ja: 'モジュール 01 · プロジェクト・名簿管理' },
    title: { en: 'Projects & people', ja: 'プロジェクトと関係者名簿' },
    summary: {
      en: 'Keep people and organisations in one shared directory across all your projects, with clear project roles and distribution lists.',
      ja: '人物と組織を1つの共有名簿で一元管理し、各プロジェクトでの役割や議事録の配布対象を明確に設定できます。',
    },
    bullets: {
      en: [
        'Projects with code, client and status (e.g. HFR01 · Harbourfront Residences, Marina Bay Developments).',
        'One shared directory of people and organisations: client, consultant, contractor, subcontractor, supplier, and authority.',
        'Project members with defined roles and a one-click distribution list toggle.',
        'Import existing contacts directly from Excel or CSV files.',
        'Pin active projects to the sidebar with custom colour markers for instant switching.',
      ],
      ja: [
        'プロジェクトコード、クライアント、ステータスを設定して管理（例：HFR01 · Harbourfront Residences、Marina Bay Developments）。',
        '発注者・コンサルタント・元請・協力会社・サプライヤー・関係官庁を網羅する共通の人物・組織ディレクトリ。',
        'プロジェクトごとの担当ロール設定と、議事録配布リスト（Distribution）の切り替え。',
        '既存の連絡先データをExcelまたはCSVから一括インポート。',
        '進行中のプロジェクトをサイドバーにピン留めし、カラーラベルで素早く切り替え。',
      ],
    },
    screenshot: SCREENSHOTS.projectsPeople,
    screenshotCaption: {
      en: 'Project PL27 (Product Launch 2027) showing recurring meeting series, project members, organisations, and distribution toggles.',
      ja: 'プロジェクト PL27（Product Launch 2027）の会議シリーズ、メンバー、所属組織、配布設定画面。',
    },
    liteIncluded: true,
    liteNote: { en: 'Up to 5 open projects', ja: '最大5件の進行中プロジェクト' },
    proIncluded: true,
    proNote: { en: 'Unlimited projects', ja: 'プロジェクト数無制限' },
  },
  {
    id: 'meeting-series',
    number: '02',
    eyebrow: { en: 'MODULE 02 · RECURRING CADENCE', ja: 'モジュール 02 · 定例シリーズ管理' },
    title: { en: 'Meeting series & meetings', ja: '会議シリーズと各回会議' },
    summary: {
      en: 'Structure weekly, fortnightly, monthly or ad hoc series with automatic numbering and a disciplined five-stage lifecycle.',
      ja: '週次・隔週・月次・臨時の会議シリーズを自動採番で整理し、DraftからApprovedまでの明確なステータスで進行します。',
    },
    bullets: {
      en: [
        'Recurring series (weekly, fortnightly, monthly, ad hoc) with automatic reference numbering such as RIV01-CM-012 or HFR01-CM-015.',
        'Default time, location, chair, minute taker, attendees and agenda template remembered per series.',
        'Clear, auditable status flow: Draft → Agenda → Live → Minutes → Approved.',
        'Each series tracks its own sequence and links directly to previous and subsequent meetings.',
      ],
      ja: [
        '週次・隔週・月次・臨時の定例シリーズに対応し、RIV01-CM-012 や HFR01-CM-015 のように会議番号を自動採番。',
        '標準の開催時刻、場所、議長、書記、出席者、アジェンダテンプレートをシリーズごとに保持。',
        'Draft → Agenda → Live → Minutes → Approved の明確なステータス遷移。',
        'シリーズごとに履歴が連続し、前回・次回の会議と自動的に紐付け。',
      ],
    },
    screenshot: SCREENSHOTS.projectsPeople,
    screenshotCaption: {
      en: 'Meeting series configuration inside a project, with pinned series accessible directly in the left sidebar.',
      ja: 'プロジェクト内の会議シリーズ一覧と、左サイドバーにピン留めされた定例会議シリーズ。',
    },
    liteIncluded: true,
    proIncluded: true,
  },
  {
    id: 'agenda-builder',
    number: '03',
    eyebrow: { en: 'MODULE 03 · PREPARATION', ja: 'モジュール 03 · アジェンダ作成' },
    title: { en: 'Agenda builder', ja: 'アジェンダビルダー' },
    summary: {
      en: 'Build structured sections and numbered items with presenters, time allocations, and reusable templates before the meeting begins.',
      ja: 'セクションと番号付き議題（1.01、1.02…）、発表者、予定時間を設定し、会議前にPDFとして配布できます。',
    },
    bullets: {
      en: [
        'Structured sections and automatically numbered items (1.01, 1.02, 2.01, 2.02…).',
        'Assign presenters and time allotted per item with automatic start-time calculation.',
        'Planned-time warning when the sum of items exceeds the scheduled meeting duration.',
        'Drag to reorder items and sections, or apply saved agenda templates in one click.',
        'Issue the prepared agenda as a clean, branded PDF ahead of the meeting.',
      ],
      ja: [
        'セクション分けと自動採番される議題アイテム（1.01、1.02、2.01…）。',
        '各議題に発表者と所要時間を割り当て、開始予定時刻を自動計算。',
        '予定時間の合計が会議枠を超えた際に自動でアラート表示。',
        'ドラッグ＆ドロップでの並び替えや、保存済みアジェンダテンプレートの適用に対応。',
        '作成したアジェンダを会議前にブランドロゴ入りPDFとして出力。',
      ],
    },
    screenshot: SCREENSHOTS.agendaHfr,
    screenshotCaption: {
      en: 'Agenda builder for HFR01 Weekly Coordination Meeting showing numbered items, presenters, start times, and durations.',
      ja: 'HFR01 定例調整会議のアジェンダ作成画面。議題番号、担当者、開始時刻、所要時間を一覧表示。',
    },
    liteIncluded: true,
    proIncluded: true,
  },
  {
    id: 'live-minutes',
    number: '04',
    eyebrow: { en: 'MODULE 04 · IN-MEETING CAPTURE', ja: 'モジュール 04 · リアルタイム議事録' },
    title: { en: 'Live minutes', ja: 'ライブ議事録入力' },
    summary: {
      en: 'Type notes, decisions and actions directly against each agenda item using rapid keyboard prefixes without taking your hands off the keyboard.',
      ja: 'キーボードから手を離さず、各議題に対してメモ・決定事項・アクションを即座に記録できます。',
    },
    bullets: {
      en: [
        'Type directly against each agenda item while the meeting runs.',
        'Switch entry type between Info, Discussion, Decision and Action with Ctrl+1–4 or quick prefixes (a:, dec:, d:).',
        'Assign owners, priorities and due dates on actions on the spot.',
        'Raise a numbered issue directly from any minute entry.',
        'Per-item timer and total elapsed meeting clock in the top bar; keyboard-first design throughout.',
      ],
      ja: [
        '会議の進行に合わせて、各アジェンダ項目の下に直接エントリを入力。',
        'Ctrl+1〜4 またはプレフィックス（a:、dec:、d:）で Info / Discussion / Decision / Action を即座に切り替え。',
        'Action（タスク）にはその場で担当者（Owner）、優先度、期限（Due date）を設定。',
        '任意の議事録エントリから直接、番号付きの課題（Issue）を起票可能。',
        '議題ごとのタイマーと全体の経過時間を上部に表示するキーボードファースト設計。',
      ],
    },
    screenshot: SCREENSHOTS.liveMinutesHfr,
    screenshotCaption: {
      en: 'Live minutes view showing Decisions, Actions, Info entries, per-item timer, and rapid "a:" prefix entry.',
      ja: 'ライブ議事録画面。Decision、Action、Info の記録、タイマー、「a:」プレフィックスによる高速入力。',
    },
    liteIncluded: true,
    proIncluded: true,
  },
  {
    id: 'attendance',
    number: '05',
    eyebrow: { en: 'MODULE 05 · ROLL CALL', ja: 'モジュール 05 · 出席管理' },
    title: { en: 'Attendance', ja: '出席・欠席・遅刻の記録' },
    summary: {
      en: 'Record attendance grouped by organisation with one-click status toggles and exact arrival times for late attendees.',
      ja: '所属組織ごとに整理された名簿で、出席・欠席・事前連絡・遅刻（到着時刻付き）をワンクリックで記録します。',
    },
    bullets: {
      en: [
        'Five clear states: Invited, Present, Absent, Apologies, and Late with exact arrival time (e.g. arrived 09:50).',
        'Automatically grouped by organisation for clear site and client reporting.',
        'One-click "Add project members on distribution" to populate the expected roll call.',
        'Full keyboard shortcuts to mark attendance down the list in seconds.',
      ],
      ja: [
        'Invited / Present / Absent / Apologies / Late（到着時刻の記録付き、例：arrived 09:50）の5ステータスに対応。',
        '所属組織（Organisation）ごとに自動グループ化され、対外提出用の議事録でも見やすい構成。',
        '「Add project members on distribution」ボタン1つで配布対象メンバーを一括追加。',
        'キーボードショートカットだけで上から順に出席確認を完了可能。',
      ],
    },
    screenshot: SCREENSHOTS.attendance,
    screenshotCaption: {
      en: 'Attendance register grouped by organisation, showing Present, Absent, and Late with arrival time (09:50).',
      ja: '組織別にグループ化された出席確認画面。出席・欠席・遅刻（到着時刻 09:50）を明瞭に記録。',
    },
    liteIncluded: true,
    proIncluded: true,
  },
  {
    id: 'approve-revisions',
    number: '06',
    eyebrow: { en: 'MODULE 06 · DOCUMENT CONTROL', ja: 'モジュール 06 · 承認と改訂履歴' },
    title: { en: 'Approve, issue & revisions', ja: '議事録の承認・発行・リビジョン管理' },
    summary: {
      en: 'Lock approved minutes to generate an immutable PDF record, with formal revision control whenever changes are required later.',
      ja: 'ワンステップで議事録を承認・ロックしてPDFを発行。後から修正が必要な場合は理由を記録してRev 1、Rev 2として管理します。',
    },
    bullets: {
      en: [
        'One-step "Approve minutes" action locks the minutes, agenda, attendance and meeting details, and issues a branded PDF.',
        'Pre-approval checks alert you to incomplete fields before locking.',
        'Reopen approved minutes only with a recorded reason to issue Rev 1, Rev 2…',
        'Full approval history showing who approved each revision and when.',
        'Issued PDFs are frozen in time and never silently overwritten.',
      ],
      ja: [
        '「Approve minutes」のワンステップで議事録・アジェンダ・出席者をロックし、正式なPDFを発行。',
        '承認前の自動チェック機能により、未入力項目や抜け漏れを事前に確認。',
        '承認後の再編集には理由の記録が必須となり、自動的に Rev 1、Rev 2… として新しいリビジョンを発行。',
        '誰がいつ承認・再オープンしたかの完全な承認履歴を保持。',
        '一度発行された各リビジョンのPDFはそのまま保存され、後から書き換わることはありません。',
      ],
    },
    screenshot: SCREENSHOTS.approveDialog,
    screenshotCaption: {
      en: 'Approval confirmation dialog locking HFR01-CM-015 and generating the permanent Revision 0 PDF record.',
      ja: 'HFR01-CM-015 の承認確認ダイアログ。議事録をロックし、改ざんされないPDFを発行します。',
    },
    liteIncluded: true,
    proIncluded: true,
  },
  {
    id: 'minutes-pdf-word',
    number: '07',
    eyebrow: { en: 'MODULE 07 · FORMAL PUBLICATIONS', ja: 'モジュール 07 · PDF・Word出力' },
    title: { en: 'Minutes PDF & Word', ja: 'ブランドロゴ入り議事録PDF & Word出力' },
    summary: {
      en: 'Issue client-ready minutes with dual letterheads, structured registers, and native multi-script typography in A4 or Letter.',
      ja: '自社ロゴとクライアント情報を並べた美しいヘッダー、決定事項・アクション一覧を備えたA4/Letter対応のPDFおよびWordを出力。',
    },
    bullets: {
      en: [
        'Your company letterhead and logo on the left, and the client block and logo on the right.',
        'Complete formal sections: attendance by organisation, numbered minutes, decisions table, action register, issues summary, distribution list, and next meeting.',
        'Supports both A4 and US Letter page sizes with page numbering and revision footers.',
        'Word (.docx) export built with real document styles for teams that require editable copies.',
        'Japanese (日本語) and Tamil (தமிழ்) text rendering built in with zero missing-glyph boxes.',
      ],
      ja: [
        '左側に自社のレターヘッドとロゴ、右側にクライアント名とロゴを配置した正式フォーマット。',
        '組織別出席表、議事内容、決定事項一覧、アクションレジスター、課題サマリー、配布先一覧、次回予定を網羅。',
        'A4およびLetterサイズに対応し、ページ番号とリビジョン表記をフッターに自動印字。',
        '適切な見出し・段落スタイルが適用されたWord（.docx）形式でのエクスポートに対応。',
        '日本語・英語・タミル語（தமிழ்）の混在テキストも文字化けなく美しく組版。',
      ],
    },
    screenshot: SCREENSHOTS.pdfPage1,
    secondaryScreenshot: SCREENSHOTS.pdfPage4,
    screenshotCaption: {
      en: 'Issued 4-page Minutes of Meeting PDF (HFR01-CM-014 Rev 0) showing dual company logos, attendance, decisions, action register, and distribution list.',
      ja: '発行された議事録PDF（HFR01-CM-014 Rev 0）。両社ロゴ、出席表、決定事項、アクション一覧、配布先リストを収録。',
    },
    liteIncluded: true,
    liteNote: { en: 'PDF with small "Made with Kaigi Lite" footer', ja: 'PDF出力（フッターに小さなLite表記あり）' },
    proIncluded: true,
    proNote: { en: 'PDF (no footer) + Word (.docx) export', ja: 'PDF（フッター表記なし）＋ Word出力' },
  },
  {
    id: 'carry-forward',
    number: '08',
    eyebrow: { en: 'MODULE 08 · CONTINUITY', ja: 'モジュール 08 · 自動キャリーフォワード' },
    title: { en: 'Carry-forward', ja: '未完了事項の次回自動引き継ぎ' },
    summary: {
      en: 'Open actions and issues carry forward into the next meeting automatically under their original reference numbers.',
      ja: '未完了のアクションや課題は、元の採番を維持したまま次回会議の「Matters arising」へ自動的に引き継がれます。',
    },
    bullets: {
      en: [
        'Open actions and issues appear in the next meeting automatically under "Matters arising" keeping their original numbers (e.g. 5.02 from HFR01-CM-016).',
        'Status updates and progress notes discussed in the new meeting are recorded directly in the minutes.',
        '"Refresh carry-forward" preview shows exactly which items will be added and which closed items will be removed before you confirm.',
        'Eliminates manual copy-pasting from last week’s Word document.',
      ],
      ja: [
        '未完了のアクションと課題は、元の番号（例：5.02 from HFR01-CM-016）を保ったまま次回会議へ自動引き継ぎ。',
        '次回会議で話し合われた進捗状況やステータス変更も、そのまま議事録の履歴として記録。',
        '「Refresh carry-forward」プレビューにより、追加される未完了項目と除外される完了項目を事前確認してチェック可能。',
        '前回のWordファイルから手作業でコピー＆ペーストする手間と転記ミスをゼロにします。',
      ],
    },
    screenshot: SCREENSHOTS.carryForward,
    screenshotCaption: {
      en: 'Refresh carry-forward preview dialog showing open items to add and completed items to remove before updating.',
      ja: '「Refresh carry-forward」ダイアログ。追加される未完了項目と完了済み項目の差分を明確にプレビュー。',
    },
    liteIncluded: true,
    proIncluded: true,
  },
  {
    id: 'actions',
    number: '09',
    eyebrow: { en: 'MODULE 09 · ACCOUNTABILITY', ja: 'モジュール 09 · アクション管理' },
    title: { en: 'Actions', ja: 'アクション（タスク）管理とカンバンボード' },
    summary: {
      en: 'View your own tasks, all project actions, or an interactive Kanban board with explicit overdue labels and full change history.',
      ja: 'My Tasks、全アクション一覧、カンバンボードを切り替え、期限切れの明示や変更履歴の追跡、Excel出力に対応します。',
    },
    bullets: {
      en: [
        'Switch instantly between My Tasks, All actions, and a Kanban board (Open, In progress, Done).',
        'Overdue items are highlighted with an explicit "Overdue" word label, not colour alone, for full accessibility.',
        'Filter by search text, project, owner, organisation, and due date range — with your filters remembered.',
        'Full change history tracked per action showing every date, owner or status update.',
        'One-click Excel export for sharing with external stakeholders.',
      ],
      ja: [
        '「My Tasks」「All actions」「Board（Open / In progress / Done）」の3つのビューをワンクリックで切り替え。',
        '期限切れの項目は色だけでなく「Overdue」という文字ラベルでも明示し、高い視認性とアクセシビリティを確保。',
        'キーワード、プロジェクト、担当者、組織、期限日での絞り込みに対応し、フィルター状態を自動記憶。',
        '各アクションがいつどの会議で生まれ、どう更新されたかの完全な変更履歴を保持。',
        '外部共有用のExcelエクスポート機能。',
      ],
    },
    screenshot: SCREENSHOTS.tasksBoard,
    screenshotCaption: {
      en: 'Tasks Kanban board across Open, In progress, and Done columns with meeting origin references and explicit Overdue labels.',
      ja: 'Open / In progress / Done のカンバンボード。発生元の会議番号や「Overdue」ラベルを明瞭に表示。',
    },
    liteIncluded: true,
    liteNote: { en: 'My Tasks, All actions & Kanban board', ja: 'My Tasks・一覧・カンバンボード' },
    proIncluded: true,
    proNote: { en: 'Includes Excel register export', ja: 'Excelレジスター出力を含む' },
  },
  {
    id: 'issues-register',
    number: '10',
    eyebrow: { en: 'MODULE 10 · RISK & RESOLUTION', ja: 'モジュール 10 · 課題（イシュー）台帳' },
    title: { en: 'Issues register', ja: '課題（Issues）レジスター' },
    summary: {
      en: 'Track numbered project issues with ball-in-court ownership, location, cost code, timeline of updates, and linked actions.',
      ja: '採番された課題（ISS-007など）ごとに、カテゴリ・優先度・ボール保持者（Ball in court）・場所・コストコード・対応履歴を一元管理します。',
    },
    bullets: {
      en: [
        'Automatically numbered project issues (e.g. ISS-002, ISS-003, ISS-007).',
        'Structured fields for category, priority, ball in court (whose turn it is to act), owner, due date, physical location, and cost code.',
        'Chronological timeline of updates across meetings so the full story is never lost.',
        'Link multiple actions directly to an issue to track resolution steps.',
        'Export the entire issues register to Excel.',
      ],
      ja: [
        'ISS-002、ISS-003、ISS-007 のように課題を自動採番して一覧化。',
        'カテゴリ、優先度、Ball in court（現在誰がボールを持っているか）、担当者、期限、場所（Location）、コストコードを記録。',
        '複数回の会議にわたる議論・更新のタイムラインを時系列で保持。',
        '課題解決のための具体的なActionを複数紐付けて管理。',
        '課題台帳全体のExcelエクスポートに対応。',
      ],
    },
    screenshot: SCREENSHOTS.liveMinutesHfr,
    screenshotCaption: {
      en: 'Numbered issues (ISS-002, ISS-003, ISS-007) tracked directly alongside meeting agenda items and actions.',
      ja: '会議アジェンダやアクションと連動して管理される番号付き課題（ISS-002、ISS-003、ISS-007）。',
    },
    liteIncluded: true,
    liteNote: { en: 'Full issue tracking in app & PDF', ja: 'アプリ内管理・議事録PDF掲載' },
    proIncluded: true,
    proNote: { en: 'Includes Excel register export', ja: 'Excelレジスター出力を含む' },
  },
  {
    id: 'decisions-log',
    number: '11',
    eyebrow: { en: 'MODULE 11 · GOVERNANCE RECORD', ja: 'モジュール 11 · 決定事項ログ' },
    title: { en: 'Decisions log', ja: '決定事項（Decisions）ログ' },
    summary: {
      en: 'Every decision from every meeting in one searchable log, showing who made it and automatically linking superseded decisions.',
      ja: 'すべての会議で決まった事項を1つの検索可能なログに集約。後から覆された決定は取り消し線付きで新しい決定へリンクされます。',
    },
    bullets: {
      en: [
        'One unified, searchable log of every decision recorded across all meetings and projects.',
        'Records exact meeting reference, date, agenda item, decision text, and who decided it (organisation or person).',
        'When a new decision replaces an earlier one, the superseded decision is struck through and links directly to the replacement.',
        'Filter by project, series, date range, decider, or toggle "Include superseded" and "Approved meetings only".',
      ],
      ja: [
        '全プロジェクト・全会議の決定事項を1つの検索可能な台帳に集約。',
        '会議番号、日付、該当議題、決定内容、決定者（Decided by）を正確に記録。',
        '過去の決定が新しい決定で置き換えられた場合、旧決定には取り消し線が引かれ、新しい決定番号（例：Superseded by PL27-MK-003 · 5.02.1）へ自動リンク。',
        'プロジェクト、期間、決定者、承認済み会議のみ等のフィルターとExcel出力に対応。',
      ],
    },
    screenshot: SCREENSHOTS.decisionsLog,
    screenshotCaption: {
      en: 'Decisions log showing current decisions across projects and a struck-through superseded decision pointing to its replacement.',
      ja: '決定事項ログ画面。有効な決定事項と、取り消し線で新しい決定へリンクされた過去の決定事項を一覧表示。',
    },
    liteIncluded: true,
    proIncluded: true,
  },
  {
    id: 'attachments',
    number: '12',
    eyebrow: { en: 'MODULE 12 · EVIDENCE & DRAWINGS', ja: 'モジュール 12 · 添付ファイル・写真・図面' },
    title: { en: 'Attachments', ja: '添付ファイル・現場写真・図面の保管' },
    summary: {
      en: 'Attach files, site photos and drawings directly to meetings, agenda items, minute entries, actions and issues.',
      ja: '会議全体、各議題、議事録エントリ、アクション、課題に対して、ファイルや現場写真、図面をドラッグ＆ドロップで添付できます。',
    },
    bullets: {
      en: [
        'Attach files, photos and marked-up drawings to meetings, agenda items, minute entries, actions, and issues.',
        'Drag and drop from Windows Explorer or paste screenshots directly from your clipboard (Ctrl+V).',
        'Stored safely inside Kaigi’s local folder on your PC so links never break when files move.',
      ],
      ja: [
        '会議、アジェンダ項目、議事録エントリ、アクション、課題のすべてにファイル・写真・図面を添付可能。',
        'エクスプローラーからのドラッグ＆ドロップ、またはクリップボードからの直接貼り付け（Ctrl+V）に対応。',
        'PC内のKaigi専用ローカルフォルダに安全に格納されるため、元ファイルの移動によるリンク切れを防ぎます。',
      ],
    },
    screenshot: SCREENSHOTS.agendaPl27,
    screenshotCaption: {
      en: 'Structured meeting workspace where attachments, carried-forward items, and agenda sections live together.',
      ja: '添付ファイル、引き継ぎ項目、アジェンダセクションを一体で管理する会議ワークスペース。',
    },
    liteIncluded: true,
    proIncluded: true,
  },
  {
    id: 'outputs',
    number: '13',
    eyebrow: { en: 'MODULE 13 · DISTRIBUTION & REGISTERS', ja: 'モジュール 13 · 外部出力・メール下書き' },
    title: { en: 'Outputs', ja: 'Excel台帳・メール下書き・カレンダー招待出力' },
    summary: {
      en: 'Generate whole-project Excel registers, Outlook email drafts with the PDF attached, and .ics calendar invitations — without Kaigi ever sending anything behind your back.',
      ja: 'プロジェクト全体のExcel台帳出力、PDF添付済みのOutlookメール下書き作成、カレンダー招待（.ics）出力に対応。Kaigiが勝手に外部送信することは一切ありません。',
    },
    bullets: {
      en: [
        'Export multi-sheet Excel registers for a whole project (actions, issues, decisions, attendance).',
        'Prepare an Outlook email draft addressed to the distribution list with the issued PDF already attached.',
        'Generate standard calendar invitations (.ics) for upcoming meetings.',
        'Strict user control: Kaigi never transmits email or network traffic itself — you review and press Send in your mail app.',
      ],
      ja: [
        'プロジェクト全体のアクション・課題・決定事項・出席履歴をまとめたExcel台帳を出力。',
        '配布リスト宛てに発行済みPDFを添付した状態でメールアプリの下書き（Draft）を自動作成。',
        '次回会議用の標準カレンダー招待ファイル（.ics）を生成。',
        'Kaigi自身がバックグラウンドでメール送信や通信を行うことは一切なく、必ずご自身のメールアプリで確認して送信できます。',
      ],
    },
    screenshot: SCREENSHOTS.pdfPage4,
    screenshotCaption: {
      en: 'Issued register tables and distribution list ready for PDF dispatch, Word export, or Excel project registers.',
      ja: '決定事項・アクション一覧・配布リストの出力例。PDF、Word、Excel台帳、メール下書きに即座に連携。',
    },
    liteIncluded: true,
    liteNote: { en: 'PDF, email drafts & .ics invites', ja: 'PDF・メール下書き・.ics招待' },
    proIncluded: true,
    proNote: { en: 'Adds full Excel registers & Word minutes', ja: 'Excel全項目台帳・Word議事録出力を追加' },
  },
  {
    id: 'import-history',
    number: '14',
    eyebrow: { en: 'MODULE 14 · ONBOARDING & MIGRATION', ja: 'モジュール 14 · 過去データのインポート' },
    title: { en: 'Import your history', ja: '過去のExcel台帳・Word議事録のインポート' },
    summary: {
      en: 'Bring existing Excel registers and past Word minutes into Kaigi with column mapping, duplicate detection, preview, and one-click undo.',
      ja: 'これまで使っていたExcel管理表やWord議事録を、列マッピング・重複検知・事前プレビュー・取り消し（Undo）機能付きで安全に取り込めます。',
    },
    bullets: {
      en: [
        'Import legacy Excel action/issue registers and Word minutes so you do not start from a blank slate.',
        'Interactive column mapping and full preview before saving anything to your database.',
        'Automatic duplicate detection prevents double-importing people, actions, or issues.',
        'Undo any import cleanly in one click if you want to adjust mappings.',
        'Supports Kaigi Markdown format with a ready-to-copy AI conversion prompt for unstructured notes.',
      ],
      ja: [
        '既存のExcelアクション一覧・課題管理表や過去のWord議事録をインポートし、初日から履歴を引き継いで運用開始。',
        '保存前のインタラクティブな列マッピングと全件プレビューに対応。',
        '重複検知機能により、同一人物や既存タスクの二重登録を防止。',
        'インポート実行後でもワンクリックで取り消し（Undo）が可能。',
        '非定型の議事メモを整形するためのAI変換プロンプト付き「Kaigi Markdown形式」にも対応。',
      ],
    },
    screenshot: SCREENSHOTS.projectsPeople,
    screenshotCaption: {
      en: 'Bring contacts, organisations, and historical project registers directly into your Kaigi workspace.',
      ja: '連絡先、組織、過去のプロジェクト台帳をKaigiのワークスペースへスムーズに移行。',
    },
    liteIncluded: false,
    liteNote: { en: 'Contacts CSV/Excel import included', ja: '連絡先CSV/Excelインポートは利用可' },
    proIncluded: true,
    proNote: { en: 'Full Excel registers & Word minutes import', ja: 'Excel台帳・Word議事録の完全インポート' },
  },
  {
    id: 'dashboard',
    number: '15',
    eyebrow: { en: 'MODULE 15 · COMMAND OVERVIEW', ja: 'モジュール 15 · ダッシュボード' },
    title: { en: 'Dashboard', ja: 'プロジェクト横断ダッシュボード' },
    summary: {
      en: 'See open and overdue actions, issues by status and ball in court, completion and attendance rates, upcoming meetings, and recent decisions at a glance.',
      ja: '期限切れタスク、ステータス・ボール保持者別の課題数、完了率、出席率、直近の会議と決定事項を一画面で把握できます。',
    },
    bullets: {
      en: [
        'Instant counts for My overdue actions, My actions due this week, Open actions, Open issues, and Meetings awaiting approval.',
        'Visual breakdown of open actions by project and issues by status (Open, In progress, Awaiting info, Resolved) and ball in court.',
        '90-day task completion rate (on time vs late) and series attendance rate.',
        'Upcoming meetings in the next 14 days and recent decisions list.',
        'Filter by project, time period, or toggle "Only mine" — every number clicks through to the underlying list.',
      ],
      ja: [
        '自分の期限切れタスク、今週期限のタスク、未完了アクション、オープン課題、承認待ち会議数を最上部に表示。',
        'プロジェクト別の未完了アクション数、ステータス別・Ball in court別の課題内訳を視覚化。',
        '過去90日間のタスク期限内完了率（Completion rate）と会議出席率（Attendance rate）を算出。',
        '今後14日間の予定会議と、直近の決定事項リストを並べて表示。',
        'プロジェクト・期間での絞り込みや「Only mine（自分の担当のみ）」切り替えに対応し、すべての数値から詳細一覧へ直接ジャンプ。',
      ],
    },
    screenshot: SCREENSHOTS.dashboard,
    screenshotCaption: {
      en: 'Dashboard showing overdue counts, 67% completion rate, issues by status, 89% attendance rate, and recent decisions.',
      ja: 'ダッシュボード画面。期限切れ件数、完了率67%、ステータス別課題、出席率89%、直近の決定事項を一望。',
    },
    liteIncluded: true,
    liteNote: { en: 'Basic dashboard', ja: '基本ダッシュボード' },
    proIncluded: true,
    proNote: { en: 'Full dashboard & analytics', ja: 'フル機能ダッシュボード' },
  },
  {
    id: 'search',
    number: '16',
    eyebrow: { en: 'MODULE 16 · INSTANT RETRIEVAL', ja: 'モジュール 16 · 全文・多言語検索' },
    title: { en: 'Search', ja: 'Ctrl+K 横断検索（日本語・タミル語・アクセント記号対応）' },
    summary: {
      en: 'Press Ctrl+K from anywhere to search across all meetings, minutes, actions, issues, decisions, people and imported history in milliseconds.',
      ja: 'どこからでも Ctrl+K で全プロジェクトの議事録・タスク・課題・決定事項・人物・インポート履歴を瞬時に検索し、該当箇所へ直接ジャンプします。',
    },
    bullets: {
      en: [
        'One unified search bar (Ctrl+K) across every meeting, minute entry, action, issue, decision, person, attachment file name, and imported history.',
        'Full support for Japanese kanji/kana (e.g. 山田), Tamil script (தமிழ்), and accent-insensitive matching (searching Jose finds José).',
        'Displays context snippets with the exact meeting code, date, and item number.',
        'Click or press Enter on any result to jump straight to that exact entry.',
      ],
      ja: [
        'Ctrl+K 1つで、会議・議事録・アクション・課題・決定事項・人物・添付ファイル名・過去インポート分まで一括検索。',
        '日本語（例：「山田」）、タミル語（தமிழ்）、アクセント記号の有無（Jose と José の両方）に完全対応。',
        '検索結果には会議コード、日付、議題番号、前後の文脈スニペットを表示。',
        '結果を選択すると、該当する会議やエントリの正確な位置へダイレクトに遷移。',
      ],
    },
    screenshot: SCREENSHOTS.searchCtrlK,
    screenshotCaption: {
      en: 'Ctrl+K global search finding "山田" across people and specific minute entries across multiple meetings.',
      ja: 'Ctrl+K グローバル検索で「山田」を検索し、人物名簿と複数会議の議事録エントリを瞬時に抽出。',
    },
    liteIncluded: true,
    proIncluded: true,
  },
  {
    id: 'reminders-tray',
    number: '17',
    eyebrow: { en: 'MODULE 17 · DESKTOP NUDGES', ja: 'モジュール 17 · リマインダーとタスクトレイ' },
    title: { en: 'Reminders & tray', ja: '日次ダイジェスト通知とWindowsトレイ常駐' },
    summary: {
      en: 'Receive a calm morning digest of overdue and due-today tasks, pre-meeting alerts, and a quiet Windows system tray icon with privacy mode.',
      ja: '毎朝の期限切れ・当日タスク通知や会議開始前アラートをWindows通知でお知らせ。画面共有時に配慮したプライバシーモードも備えています。',
    },
    bullets: {
      en: [
        'Daily morning digest at your chosen time with your overdue and due-today actions, plus minutes waiting for approval.',
        'Meeting-starting-soon alerts (e.g. 15 minutes before) for scheduled draft and agenda meetings.',
        'System tray icon shows your overdue count and keeps reminders running quietly when the main window is closed.',
        'Privacy toggle ("Show action titles in notifications"): switch off to show counts only when others can see your screen.',
        'Optional launch on Windows startup and one-click "Pause until tomorrow".',
      ],
      ja: [
        '指定時刻（例：08:30 AM）に期限切れ・当日・翌日期限のタスクや承認待ち議事録を知らせるデイリーダイジェスト。',
        '会議開始前（例：15分前）のWindowsデスクトップ通知。',
        'ウィンドウを閉じてもWindowsタスクトレイで静かに待機し、期限切れ件数を表示。',
        '画面共有中や周囲から画面が見える環境向けに、通知にタスク名を出さず件数のみ表示するプライバシー設定を搭載。',
        '「明日まで一時停止」やWindows起動時の自動開始にも対応。',
      ],
    },
    screenshot: SCREENSHOTS.reminders,
    screenshotCaption: {
      en: 'Reminders configuration screen showing daily digest time, pre-meeting alerts, screen-sharing privacy toggle, and live notification preview.',
      ja: 'リマインダー設定画面。ダイジェスト時刻、会議前通知、画面共有向けの件数のみ表示モード、通知プレビュー。',
    },
    liteIncluded: true,
    proIncluded: true,
  },
  {
    id: 'templates-audit',
    number: '18',
    eyebrow: { en: 'MODULE 18 · STANDARDS & TRACEABILITY', ja: 'モジュール 18 · テンプレートと監査ログ' },
    title: { en: 'Templates & audit', ja: 'アジェンダテンプレート管理と追記型監査ログ' },
    summary: {
      en: 'Standardise meeting structures with reusable agenda templates and maintain a complete, append-only audit trail of every change.',
      ja: '定例会議の型を標準化するテンプレートマネージャーと、すべての変更履歴を改ざん不能な追記形式で記録する監査（Audit）ページ。',
    },
    bullets: {
      en: [
        'Dedicated agenda template manager to create, edit and standardise meeting structures across projects.',
        'Complete, append-only history of every change made across meetings, actions, issues, decisions and people.',
        'Dedicated Audit page with filters by entity, action type, and date range.',
        'Export the filtered audit log directly to Excel for compliance and project governance.',
      ],
      ja: [
        '社内の定例会議フォーマットを標準化・再利用できるアジェンダテンプレート管理機能。',
        '会議、タスク、課題、決定事項、名簿に対するすべての変更を追記専用（Append-only）で記録。',
        '対象データや日付で絞り込める専用のAudit（監査）画面。',
        'コンプライアンスや品質管理向けに、監査ログをそのままExcelへエクスポート可能。',
      ],
    },
    screenshot: SCREENSHOTS.agendaPl27,
    screenshotCaption: {
      en: 'Apply or save agenda templates in one click and access the complete append-only Audit log from the sidebar.',
      ja: 'ワンクリックでのテンプレート適用・保存と、サイドバーからアクセスできるAudit（監査）ログ。',
    },
    liteIncluded: true,
    liteNote: { en: 'Templates & in-app change history', ja: 'テンプレート・各画面の変更履歴' },
    proIncluded: true,
    proNote: { en: 'Full templates manager + Audit page with Excel export', ja: 'テンプレート管理＋Audit画面・Excel出力' },
  },
  {
    id: 'ai-assistant',
    number: '19',
    v1Badge: true,
    eyebrow: { en: 'MODULE 19 · LOCAL AI [COMING IN V1.0]', ja: 'モジュール 19 · ローカルAIアシスタント [v1.0予定]' },
    title: { en: 'AI meeting assistant', ja: 'AIミーティングアシスタント（完全オフライン）' },
    summary: {
      en: 'Import a Teams transcript (.vtt/.docx) or record the meeting locally; Kaigi’s built-in offline AI drafts minutes per agenda item for your approval.',
      ja: 'Teamsの字幕ファイル（.vtt/.docx）や録音から、PC内蔵のオフラインAIが議題ごとの議事録・決定事項・タスク案を作成します。',
    },
    bullets: {
      en: [
        'Import a Microsoft Teams meeting transcript (.vtt or .docx) or record audio directly inside Kaigi.',
        'Kaigi’s built-in offline AI drafts structured minutes per agenda item, extracting decisions and actions with suggested owners and due dates.',
        'Human-in-the-loop review: you inspect, edit, or approve each drafted line before it enters the minutes.',
        'Runs 100% locally on your own PC with zero internet connection — and can be switched off completely in Settings so no AI process runs at all.',
      ],
      ja: [
        'Teams会議のトランスクリプト（.vtt / .docx）の読み込み、またはKaigi内での直接録音に対応。',
        'PC上で動作するオフラインAIが議題ごとに議事メモ・決定事項・担当者/期限付きのアクション案を自動作成。',
        '勝手に確定されることはなく、人間が1行ずつ確認・編集して承認した項目のみが議事録に反映。',
        'インターネット通信ゼロでPC内のみで動作。設定で完全にオフにすればAIプロセス自体が一切起動しません。',
      ],
    },
    screenshot: SCREENSHOTS.liveMinutesPl27,
    screenshotCaption: {
      en: 'Structured agenda items and minute entries where local AI drafts are reviewed and approved line by line.',
      ja: 'ローカルAIが作成した下書きを議題ごとに1件ずつ確認・承認できる議事録画面。',
    },
    liteIncluded: false,
    proIncluded: true,
    proNote: { en: 'Included in Pro (100% local on PC)', ja: 'Proに収録（PC内で完結）' },
  },
  {
    id: 'ask-meetings',
    number: '20',
    v1Badge: true,
    eyebrow: { en: 'MODULE 20 · LOCAL KNOWLEDGE [COMING IN V1.0]', ja: 'モジュール 20 · 過去議事録への質問 [v1.0予定]' },
    title: { en: 'Ask your meetings', ja: '過去の会議に自然言語で質問（Ask your meetings）' },
    summary: {
      en: 'Ask natural-language questions across all past minutes ("what did we decide about the façade supplier?") and get answers with direct citations, offline.',
      ja: '「外装サプライヤーについていつ何を決めた？」など、過去の全議事録に対してオフラインで質問し、根拠となるエントリ付きで回答を得られます。',
    },
    bullets: {
      en: [
        'Ask plain-language questions across all past meetings and projects, such as "What did we decide about the façade supplier?" or "When did we move the launch date?".',
        'Answers are synthesised strictly from your own recorded minutes, decisions and issues.',
        'Every answer includes clickable links to the exact meeting and minute entry so you can verify the source immediately.',
        'Runs completely offline on your PC.',
      ],
      ja: [
        '「ファサードのサプライヤーについて何を決めた？」「ローンチ日をいつ変更した？」といった質問を自然言語で入力。',
        'ご自身のPC内に蓄積された議事録・決定事項・課題データのみを根拠に回答を生成。',
        '回答には該当する会議番号とエントリへの直接リンクが付与され、即座に原文を確認可能。',
        '外部クラウドへ一切データを送らず、100%オフラインで動作。',
      ],
    },
    screenshot: SCREENSHOTS.searchCtrlK,
    screenshotCaption: {
      en: 'Instant retrieval across your entire meeting history with direct links to the source minute entries.',
      ja: '過去の全議事録から根拠となるエントリを特定し、直接リンクで参照可能。',
    },
    liteIncluded: false,
    proIncluded: true,
    proNote: { en: 'Included in Pro (offline)', ja: 'Proに収録（完全オフライン）' },
  },
  {
    id: 'outlook-link',
    number: '21',
    v1Badge: true,
    eyebrow: { en: 'MODULE 21 · CALENDAR BRIDGE [COMING IN V1.0]', ja: 'モジュール 21 · Outlookカレンダー連携 [v1.0予定]' },
    title: { en: 'Outlook calendar link', ja: 'Outlookカレンダー直接連携（クラウド認証不要）' },
    summary: {
      en: 'Create and update the Outlook calendar meeting directly from Kaigi on the same Windows PC — with no cloud sign-in, Graph API token, or IT approval required.',
      ja: '同じPC上のOutlookカレンダー予定をKaigiから直接作成・更新。クラウドサインインや情シス部門のAPI承認は一切不要です。',
    },
    bullets: {
      en: [
        'Create and update the corresponding Outlook calendar appointment directly from Kaigi on the same PC.',
        'Syncs meeting time, location, agenda summary, and invited attendees with classic desktop Outlook.',
        'Communicates locally on your Windows desktop — no Microsoft 365 cloud sign-in, no server connectors, and no IT admin approval needed.',
      ],
      ja: [
        '同じWindows PC上のクラシックOutlookと直接連携し、会議予定の作成・日時変更をKaigi側から実行。',
        '開催日時、場所、アジェンダ概要、出席者をそのままOutlook予定表に反映。',
        'PC内のローカル連携で完結するため、クラウドログインや社内IT管理者によるアプリ承認手続きなしで導入可能。',
      ],
    },
    screenshot: SCREENSHOTS.agendaPl27,
    screenshotCaption: {
      en: 'Keep meeting dates, times, locations, and distribution lists aligned with your desktop Outlook calendar.',
      ja: '会議の日時・場所・出席メンバーをデスクトップのOutlook予定表とローカル連携。',
    },
    liteIncluded: true,
    proIncluded: true,
  },
  {
    id: 'backup-move',
    number: '22',
    v1Badge: true,
    eyebrow: { en: 'MODULE 22 · PORTABILITY & SECURITY [COMING IN V1.0]', ja: 'モジュール 22 · バックアップとPC移行 [v1.0予定]' },
    title: { en: 'Backup & move PC', ja: '暗号化バックアップと新しいPCへの簡単移行' },
    summary: {
      en: 'Package your entire database and attachments into one password-protected backup file to restore on a new PC, plus scheduled backups and optional PIN encryption.',
      ja: 'パスワード保護された1つのバックアップファイルで新しいPCへ丸ごと移行。定期自動バックアップとPINによるデータベース暗号化にも対応します。',
    },
    bullets: {
      en: [
        'Create a single password-protected backup file containing all projects, minutes, attachments, templates and audit history.',
        'Restore everything cleanly on a new Windows PC in minutes.',
        'Automatic scheduled backups to a local drive or network folder of your choice.',
        'Optional local database encryption unlocked with your personal PIN on startup.',
      ],
      ja: [
        '全プロジェクト・議事録・添付ファイル・テンプレート・監査履歴を、パスワード保護された1つのファイルにバックアップ。',
        'PC買い替え時も、バックアップファイルを読み込むだけで新しいWindows PCに環境を完全復元。',
        '指定フォルダや外付けドライブへの定期自動バックアップ設定。',
        '起動時のPINコード入力によるローカルデータベース暗号化オプション。',
      ],
    },
    screenshot: SCREENSHOTS.dashboard,
    screenshotCaption: {
      en: 'Your entire local workspace can be backed up to a single encrypted archive and restored on any Windows PC.',
      ja: 'すべてのローカルデータを1つの暗号化アーカイブにまとめ、別PCへいつでも復元可能。',
    },
    liteIncluded: true,
    proIncluded: true,
  },
  {
    id: 'editions-module',
    number: '23',
    v1Badge: true,
    eyebrow: { en: 'MODULE 23 · TRANSPARENT LICENSING [COMING IN V1.0]', ja: 'モジュール 23 · エディションとデータ保護 [v1.0予定]' },
    title: { en: 'Editions', ja: 'Kaigi Lite（無料）と Kaigi Pro（オフラインライセンスキー）' },
    summary: {
      en: 'One Windows installer for both Kaigi Lite (free) and Kaigi Pro, unlocked with an offline licence key — and your data is never locked.',
      ja: '1つのインストーラーで無料のKaigi LiteとKaigi Proに対応。オフラインのライセンスキーで有効化でき、データがロックされることは決してありません。',
    },
    bullets: {
      en: [
        'Kaigi Lite (free) includes all core meeting features for up to 5 open projects.',
        'Kaigi Pro unlocks Word minutes, Excel registers, history imports, full dashboard, Audit Excel export, local AI assistant, and unlimited projects.',
        'Single Windows installer: upgrade from Lite to Pro anytime by entering an offline licence key — no reinstall or account needed.',
        'Zero data lock-in: even if you exceed project limits, extra projects turn read-only and export and backup always work in every edition.',
      ],
      ja: [
        'Kaigi Lite（無料）は、最大5件の進行中プロジェクトまで会議・議事録・タスク・課題・決定事項の全基本機能を利用可能。',
        'Kaigi Proは、Word出力、Excel台帳出力、過去データインポート、フルダッシュボード、監査Excel出力、ローカルAI、無制限プロジェクトを解放。',
        '共通のWindowsインストーラーを採用し、オフラインのライセンスキーを入力するだけでいつでもProへ切り替え可能。',
        'データの囲い込みゼロ：制限を超えた場合もプロジェクトは閲覧可能（Read-only）となり、エクスポートとバックアップは全エディションで常に動作します。',
      ],
    },
    screenshot: SCREENSHOTS.projectsPeople,
    screenshotCaption: {
      en: 'Manage up to 5 open projects free in Kaigi Lite, or unlock unlimited projects and heavy-duty exports in Kaigi Pro.',
      ja: 'Kaigi Liteで最大5プロジェクトまで無料運用、またはKaigi Proで無制限プロジェクトと高度な入出力を解放。',
    },
    liteIncluded: true,
    liteNote: { en: 'Free forever (up to 5 open projects)', ja: '無料（最大5プロジェクト）' },
    proIncluded: true,
    proNote: { en: 'Offline licence key ([price])', ja: 'オフラインライセンスキー（[price]）' },
  },
];

export const BUILT_FOR_TABS = [
  {
    id: 'construction',
    label: { en: 'Construction coordination', ja: '建設・現場定例会議' },
    eyebrow: { en: 'SITE COORDINATION & SUBCONTRACTORS', ja: '建築・設備・施工調整会議' },
    headline: {
      en: 'Weekly site meetings where RFIs, drawing clashes and subcontractor actions stay on record.',
      ja: '週次の現場定例や設計・施工調整で、RFIや図面干渉、協力会社のアクションを確実に追跡。',
    },
    description: {
      en: 'Run weekly coordination series (like HFR01-CM-015 for Harbourfront Residences) across clients, architects, M&E engineers, quantity surveyors and subcontractors.',
      ja: 'Harbourfront Residences（HFR01-CM-015）のような定例工事会議で、発注者・設計事務所・設備・積算・専門工事会社をまたぐ決定と課題を管理します。',
    },
    bullets: {
      en: [
        'Attendance grouped by organisation (Client, Architect, M&E, Main Contractor, Subcontractor) with late arrival times.',
        'Track RFIs, pile integrity tests, and curtain wall clashes as numbered issues (ISS-002, ISS-003, ISS-007) with explicit ball in court, location, and cost code.',
        'Issue dual-logo PDF minutes with your letterhead on the left and the client block on the right.',
        'Works 100% offline in basement site offices or active construction zones with poor signal.',
      ],
      ja: [
        '発注者・設計・設備・元請・協力会社など所属組織別の出席表と、遅刻者の到着時刻を記録。',
        'RFIの回答待ちや杭試験、カーテンウォールの干渉などを番号付き課題（ISS-002、ISS-003、ISS-007）として場所・コストコード・Ball in court付きで管理。',
        '左に自社ロゴ、右に発注者ロゴを配した公式フォーマットの議事録PDFをその場で発行。',
        '電波の届かない地下現場事務所や仮設オフィスでも、100%オフラインで軽快に動作。',
      ],
    },
    screenshot: SCREENSHOTS.liveMinutesHfr,
    secondaryScreenshot: SCREENSHOTS.pdfPage1,
    caption: {
      en: 'Harbourfront Residences (HFR01-CM-015) live coordination minutes and dual-letterhead PDF output.',
      ja: 'Harbourfront Residences（HFR01-CM-015）のライブ議事録と、両社ロゴ入り発行PDF。',
    },
  },
  {
    id: 'team-meetings',
    label: { en: 'Team meetings', ja: '部門・プロジェクト定例' },
    eyebrow: { en: 'RECURRING TEAM & LAUNCH OPS', ja: '週次チーム定例・プロジェクト推進' },
    headline: {
      en: 'Weekly team syncs where last week’s open follow-ups are already waiting in the agenda.',
      ja: '先週の未完了タスクが最初からアジェンダに並んだ状態で始まる、無駄のない週次チーム定例。',
    },
    description: {
      en: 'Stop rebuilding the agenda from scratch every Monday morning. Kaigi carries open tasks and issues forward automatically and nudges owners before things slip.',
      ja: '毎週月曜日に前回の議事録から手作業で未完了項目を転記する必要はありません。未完了事項は自動で引き継がれ、毎朝のダイジェスト通知が期限切れを防ぎます。',
    },
    bullets: {
      en: [
        'Start from a saved agenda template with "Matters arising" populated automatically from earlier meetings.',
        'Capture decisions and assign action owners and due dates live as you talk using a: and dec: prefixes.',
        'Morning daily digest at 08:30 AM reminds you of due-today tasks and minutes waiting for approval.',
        'Prepare an Outlook email draft to the distribution list with the PDF attached in one click.',
      ],
      ja: [
        '保存済みテンプレートと前回からの自動引き継ぎ項目（Matters arising）で数分でアジェンダを準備。',
        '会話しながら a: や dec: のショートカットで決定事項と期限付きタスクをその場で記録。',
        '毎朝 08:30 のデイリーダイジェスト通知で、当日タスクと承認待ち議事録をリマインド。',
        '会議終了後はワンクリックで配布リスト宛てのPDF添付済みOutlookメール下書きを作成。',
      ],
    },
    screenshot: SCREENSHOTS.agendaPl27,
    secondaryScreenshot: SCREENSHOTS.reminders,
    caption: {
      en: 'Product Launch 2027 (PL27-MK) weekly stand-up agenda with carried-forward items and morning digest settings.',
      ja: 'Product Launch 2027（PL27-MK）の引き継ぎ項目付きアジェンダと、朝のダイジェスト通知設定。',
    },
  },
  {
    id: 'scrum-events',
    label: { en: 'Scrum events', ja: 'スクラムイベント・開発定例' },
    eyebrow: { en: 'AGILE CEREMONIES & IMPEDIMENTS', ja: 'スプリント計画・レトロスペクティブ・障害管理' },
    headline: {
      en: 'Structured stand-ups, planning, reviews and retrospectives that work cleanly alongside Jira.',
      ja: 'Jiraと併用しながら、スプリント計画・レビュー・ふりかえりの決定経緯と障害（Impediments）を明確に記録。',
    },
    description: {
      en: 'Issue trackers hold tickets, but they rarely hold the context of why a scope trade-off was decided or who owns an external blocker. Kaigi keeps the ceremony record crisp.',
      ja: 'チケット管理ツールだけでは「なぜその仕様変更を決めたのか」「外部ブロッカーのボールは誰にあるか」が埋もれがちです。Kaigiは合意形成の文脈を確実に残します。',
    },
    bullets: {
      en: [
        'Templates for Daily Stand-up, Sprint Planning, Sprint Review, and Retrospective.',
        'Log blockers and cross-team dependencies as numbered Issues with ball-in-court tracking.',
        'Move action items across the built-in Open → In progress → Done Kanban board.',
        'Search across every past sprint decision in seconds with Ctrl+K when scope questions come up.',
      ],
      ja: [
        'デイリースクラム、スプリントプランニング、レビュー、レトロスペクティブ用のテンプレートを用意。',
        'チーム間の依存関係やブロッカーを番号付きIssueとして起票し、Ball in courtで責任所在を明確化。',
        '内蔵のカンバンボード（Open / In progress / Done）でフォローアップアクションを視覚的に管理。',
        '過去の設計判断やスコープ合意を Ctrl+K でいつでもミリ秒単位で検索。',
      ],
    },
    screenshot: SCREENSHOTS.tasksBoard,
    secondaryScreenshot: SCREENSHOTS.decisionsLog,
    caption: {
      en: 'Kanban action board and searchable Decisions log keeping sprint agreements and blockers transparent.',
      ja: 'カンバンボードと決定事項ログにより、スプリントの合意事項とブロッカーを透明化。',
    },
  },
];

export const FAQ_ITEMS = [
  {
    q: { en: 'Does it need internet?', ja: 'インターネット接続は必要ですか？' },
    a: {
      en: 'No. Kaigi runs 100% offline on your Windows 10 or Windows 11 PC. You can plan agendas, take live minutes, search history, and issue PDFs in a basement site office, on a plane, or on an air-gapped network.',
      ja: 'いいえ、不要です。KaigiはWindows 10 / 11 PC上で100%オフラインで動作します。電波のない現場事務所や飛行機内、外部ネットワークから隔離された環境でも、すべての機能（アジェンダ作成、ライブ議事録、検索、PDF発行）を利用できます。',
    },
  },
  {
    q: { en: 'Can my team share it?', ja: 'チームで共有して使えますか？' },
    a: {
      en: 'Kaigi installs for one user per PC with no server to run. You share the issued PDFs, editable Word minutes, and Excel registers with your team and clients.',
      ja: 'Kaigiはサーバー不要の1 PC・1ユーザー向けデスクトップアプリです。チームやクライアントとは、Kaigiから発行した公式PDF、編集可能なWord議事録、Excel台帳ファイルを共有して連携します。',
    },
  },
  {
    q: { en: 'Does it send email?', ja: 'Kaigiが自動的にメールを送信しますか？' },
    a: {
      en: 'No. Kaigi never sends email itself. It opens a ready-to-send draft in your mail app (such as Outlook) addressed to your distribution list with the PDF attached; you review it and press Send.',
      ja: 'いいえ。Kaigi自身がメールを自動送信することは一切ありません。お使いのメールアプリ（Outlookなど）で配布リスト宛て・PDF添付済みの「下書き」を開くところまでを行い、最終確認と送信ボタンを押す操作は必ずユーザー自身が行います。',
    },
  },
  {
    q: { en: 'Where is my data?', ja: 'データはどこに保存されますか？' },
    a: {
      en: 'All your meetings, registers and attached files are stored in one local folder inside your Windows user profile on your PC. Nothing is uploaded to a cloud database.',
      ja: 'すべての会議データ、台帳、添付ファイルは、お使いのPCのWindowsユーザープロファイル内の1つのローカルフォルダに保存されます。クラウドへアップロードされることはありません。',
    },
  },
  {
    q: { en: 'Can I bring my old minutes?', ja: '過去の議事録やExcel管理表を取り込めますか？' },
    a: {
      en: 'Yes. Kaigi imports existing Excel registers and past Word minutes with interactive column mapping, duplicate detection, a full preview before saving, and one-click undo.',
      ja: 'はい。既存のExcelアクション/課題管理表や過去のWord議事録をインポートできます。列のマッピング、重複チェック、保存前のプレビュー、ワンクリックでの取り消し（Undo）機能を備えています。',
    },
  },
  {
    q: { en: 'Is Japanese supported?', ja: '日本語には対応していますか？' },
    a: {
      en: 'Yes. Japanese (日本語), English, and Tamil (தமிழ்) are supported across attendee names, minute entries, instant Ctrl+K search, and issued PDFs and Word documents.',
      ja: 'はい。出席者名や組織名、議事録の本文、Ctrl+K による全文検索、そして出力されるPDFおよびWordファイルのすべてで日本語に完全対応しています（タミル語やアクセント付き文字にも対応）。',
    },
  },
  {
    q: { en: 'Does the AI send my meetings to the cloud?', ja: 'AI機能を使うと会議データがクラウドに送信されますか？' },
    a: {
      en: 'No. The AI meeting assistant and Ask your meetings (coming in v1.0) run locally on your own PC with no internet connection, and can be switched off completely so no AI process runs at all.',
      ja: 'いいえ。v1.0で搭載される「AI meeting assistant」および「Ask your meetings」は、インターネットを介さずお使いのPC内（ローカル）で動作します。また、設定からAI機能を完全にオフにしてプロセス自体を起動させないことも可能です。',
    },
  },
  {
    q: { en: 'Does it work with Teams and Outlook?', ja: 'TeamsやOutlookと連携できますか？' },
    a: {
      en: 'Yes. It imports Microsoft Teams transcripts (.vtt/.docx), prepares Outlook email drafts with the PDF attached, exports .ics invites, and links directly with classic Outlook on the same PC — with no cloud sign-in or IT approval needed.',
      ja: 'はい。Teams会議のトランスクリプト（.vtt/.docx）のインポートや、PDF添付済みのOutlookメール下書き作成、.icsカレンダー招待の出力に対応しています。さらにv1.0では同じPC上のクラシックOutlook予定表と直接連携でき、クラウド認証や社内IT部門の承認なしで動作します。',
    },
  },
];

export const UI_COPY = {
  en: {
    navFeatures: 'Features',
    navHowItWorks: 'How it works',
    navEditions: 'Editions',
    navFaq: 'FAQ',
    downloadBtn: 'Download',
    heroEyebrow: 'KAIGI (会議) · WINDOWS DESKTOP MEETING MANAGER',
    heroHeadline: "Meetings that end with minutes, not to-do's lost in email.",
    heroSub:
      'Agenda, live minutes, actions, issues and decisions in one Windows app. Works offline. Your data never leaves your PC.',
    heroPrimaryCta: 'Download for Windows',
    heroSecondaryCta: 'See how it works',
    heroTrustLine: 'Windows 10/11 · No account · No cloud',
    glanceItems: [
      '23 modules',
      'works 100% offline',
      'English & Japanese',
      'Windows 10/11',
    ],
    problemEyebrow: 'THE PROBLEM',
    problemHeadline: 'Why recurring meetings lose track between weeks.',
    problemSub:
      'Project managers, construction coordinators and team leads run structured meetings every week — yet the record is still split across notes, Word templates and scattered spreadsheets.',
    problemCards: [
      {
        num: '01',
        title: 'Minutes typed twice',
        body: 'Rough notes are scribbled in a notebook or chat thread during the meeting, then typed all over again into a Word template late in the evening.',
        contrast: 'In Kaigi: type live against the agenda and approve the finished PDF in one step.',
      },
      {
        num: '02',
        title: 'Actions lost between meetings',
        body: 'Tasks are buried inside last week’s PDF attachment. By the next meeting, nobody remembers what was agreed or which items are already overdue.',
        contrast: 'In Kaigi: every action has an owner and due date, and open items carry forward automatically.',
      },
      {
        num: '03',
        title: 'Registers spread across five different Excel files',
        body: 'Actions, issues, RFIs, decisions and contact lists live in separate spreadsheets that quickly drift out of sync with the issued minutes.',
        contrast: 'In Kaigi: one local database powers the minutes, actions, issues and decisions log together.',
      },
    ],
    howEyebrow: 'HOW IT WORKS',
    howHeadline: 'One continuous cycle, from agenda to next week’s carry-forward.',
    howSub: 'Click any step below to inspect the corresponding screen inside Kaigi.',
    howSteps: [
      {
        step: 'Step 1',
        title: 'Plan the agenda',
        desc: 'Build sections and numbered items (1.01, 1.02…) with presenters and allotted times from your template.',
        screenshot: SCREENSHOTS.agendaHfr,
      },
      {
        step: 'Step 2',
        title: 'Take live minutes',
        desc: 'Type against each item. Type a: for an action or dec: for a decision, with owners and due dates on the spot.',
        screenshot: SCREENSHOTS.liveMinutesHfr,
      },
      {
        step: 'Step 3',
        title: 'Approve and issue a branded PDF',
        desc: 'Lock the record in one step to generate an immutable PDF with your letterhead and the client block.',
        screenshot: SCREENSHOTS.approveDialog,
      },
      {
        step: 'Step 4',
        title: 'Track actions and issues',
        desc: 'Follow up via My Tasks, the Kanban board, the numbered Issues register, and morning desktop reminders.',
        screenshot: SCREENSHOTS.tasksBoard,
      },
      {
        step: 'Step 5',
        title: 'Open items carry forward automatically',
        desc: 'Unfinished actions and issues appear in the next meeting under their original numbers — nothing is retyped.',
        screenshot: SCREENSHOTS.carryForward,
      },
    ],
    tourEyebrow: 'FULL FEATURE TOUR · ALL 23 MODULES',
    tourHeadline: 'Every module included in Kaigi, in detail.',
    tourSub:
      'Explore all 23 modules below. Modules marked Coming in v1.0 are scheduled for the 1.0 release; everything else is available now.',
    filterAll: 'All 23 modules',
    filterNow: 'Available now (18)',
    filterV1: 'Coming in v1.0 (5)',
    comingInV1: 'Coming in v1.0',
    availableNow: 'Available now',
    moreDetails: 'More',
    lessDetails: 'Less',
    expandAllMobile: 'Expand all modules',
    collapseAllMobile: 'Collapse all modules',
    privacyEyebrow: 'PRIVACY & DATA OWNERSHIP',
    privacyHeadline: 'Your meetings stay yours.',
    privacySub:
      'Designed for commercial sensitivity, construction contracts, and organisations that cannot upload project minutes to external SaaS clouds.',
    privacyPoints: [
      {
        title: 'Works with no internet',
        body: 'Full functionality in site offices, client boardrooms, planes, or restricted networks.',
      },
      {
        title: 'No account or sign-in',
        body: 'Install on Windows and start working immediately. No user registration, telemetry, or cloud login.',
      },
      {
        title: 'Data in one folder on your PC',
        body: 'One local database and attachment folder inside your Windows user profile that you control and back up.',
      },
      {
        title: 'The AI runs on your PC, not in the cloud',
        body: 'Local AI transcription and Q&A never leave your machine — and can be switched off completely.',
      },
      {
        title: 'Kaigi never sends email itself',
        body: 'It prepares an email draft with the PDF attached in your mail app; you review and press Send.',
      },
      {
        title: 'Frozen revisions & append-only audit log',
        body: 'Issued PDFs never change. Reopening requires a recorded reason and creates Rev 1, Rev 2.',
      },
    ],
    builtForEyebrow: 'BUILT FOR RECURRING COORDINATION',
    builtForHeadline: 'Tailored to how structured meetings actually run.',
    editionsEyebrow: 'EDITIONS & LICENSING',
    editionsHeadline: 'Kaigi Lite is free. Kaigi Pro adds the heavy lifting.',
    editionsSub:
      'One installer for Windows 10/11. Start with Kaigi Lite for free and unlock Kaigi Pro anytime with an offline licence key.',
    liteTitle: 'Kaigi Lite',
    litePrice: 'Free',
    liteSub: 'Up to 5 open projects · No time limit · Offline',
    liteFeatures: [
      'All core meeting features: projects, series, agenda, live minutes, attendance, approve and revisions',
      'Actions (My Tasks, All actions, Kanban board), Issues register, Decisions log, Carry-forward, Attachments',
      'Minutes PDF with a small "Made with Kaigi Lite" footer',
      'Outlook email drafts and .ics calendar invites',
      'Basic dashboard, instant Ctrl+K search, and desktop reminders',
      'Backup and restore, up to 5 open projects',
    ],
    proTitle: 'Kaigi Pro',
    proPrice: '[price]',
    proSub: 'Unlimited projects · Offline licence key · One-time or annual',
    proFeatures: [
      'Everything in Kaigi Lite, with no "Made with Kaigi Lite" PDF footer',
      'Editable Word (.docx) minutes and full multi-sheet Excel register exports',
      'Import existing Excel registers and past Word minutes with column mapping & undo',
      'Full project dashboard, Agenda template manager, and Audit page with Excel export',
      'AI meeting assistant (.vtt/.docx transcript & audio) and Ask your meetings — 100% offline on PC',
      'Unlimited open projects',
    ],
    comparisonTitle: 'Module-by-module comparison (all 23 modules)',
    tableColModule: 'Module',
    tableColLite: 'Kaigi Lite (Free)',
    tableColPro: 'Kaigi Pro ([price])',
    dataNeverLockedNote:
      'Your data is never locked: export and backup always work, in every edition.',
    faqEyebrow: 'FREQUENTLY ASKED QUESTIONS',
    faqHeadline: 'Plain answers before you install.',
    finalCtaEyebrow: 'GET STARTED OFFLINE',
    finalCtaHeadline: 'Run your next meeting in Kaigi.',
    finalCtaSub:
      'Install on Windows 10 or 11 in under a minute. No account, no cloud setup, and fictional demo data included so you can explore right away.',
    readUserGuide: 'Read the user guide',
    footerCopyright: '© 2026 SGB Dev Apps',
    footerUserGuide: 'User guide',
    footerPrivacy: 'Privacy',
    footerContact: 'Contact: sgb.dev.apps@gmail.com',
    footerMadeFor: 'Made for Windows',
  },
  ja: {
    navFeatures: '機能一覧',
    navHowItWorks: '使い方',
    navEditions: 'エディション',
    navFaq: 'よくある質問',
    downloadBtn: 'ダウンロード',
    heroEyebrow: 'KAIGI (会議) · WINDOWS デスクトップ議事録・課題管理アプリ',
    heroHeadline: 'メールに埋もれるToDoではなく、確定した議事録で終わる会議へ。',
    heroSub:
      'アジェンダ、ライブ議事録、アクション、課題、決定事項を1つのWindowsアプリに集約。完全オフラインで動作し、データがPCの外に出ることはありません。',
    heroPrimaryCta: 'Windows版をダウンロード',
    heroSecondaryCta: '仕組みを見る',
    heroTrustLine: 'Windows 10/11 対応 · アカウント登録不要 · クラウド送信なし',
    glanceItems: [
      '全23モジュール搭載',
      '100%オフライン動作',
      '英語・日本語対応',
      'Windows 10/11',
    ],
    problemEyebrow: '従来の課題',
    problemHeadline: 'なぜ定例会議の決定事項やタスクは翌週に埋もれてしまうのか。',
    problemSub:
      'プロジェクトマネージャーや現場調整担当者、スクラムマスターは毎週定例会議を運営していますが、手書きメモ・Wordの議事録・複数のExcel管理表の間で二重作業が発生しています。',
    problemCards: [
      {
        num: '01',
        title: '議事録の二度打ち（メモからWordへ）',
        body: '会議中はノートやチャットにメモを取り、会議が終わった夜にWordフォーマットへ最初から清書し直す時間が発生しています。',
        contrast: 'Kaigiなら：アジェンダに沿ってその場で入力し、ワンステップで公式PDFを発行。',
      },
      {
        num: '02',
        title: '会議と会議の合間に消えるアクション',
        body: 'タスクが先週のPDF添付ファイルの中に埋もれ、次の会議が始まる頃には誰がいつまでにやる約束だったかが曖昧になります。',
        contrast: 'Kaigiなら：すべてのタスクに担当者と期限を紐付け、未完了分は次回へ自動引き継ぎ。',
      },
      {
        num: '03',
        title: '5つの異なるExcelファイルに分散した管理表',
        body: '課題管理表、アクション一覧、決定ログ、連絡先名簿が別々のExcelファイルに分かれ、議事録との整合性がすぐに崩れます。',
        contrast: 'Kaigiなら：1つのローカルDBで議事録・タスク・課題・決定事項が常に連動。',
      },
    ],
    howEyebrow: 'HOW IT WORKS · 5つのステップ',
    howHeadline: 'アジェンダ準備から次週への自動引き継ぎまで、途切れない1つのサイクル。',
    howSub: '各ステップをクリックすると、対応するKaigiの実際の画面を確認できます。',
    howSteps: [
      {
        step: 'Step 1',
        title: 'アジェンダを作成',
        desc: 'テンプレートからセクションと番号付き議題（1.01、1.02…）、発表者、予定時間を設定します。',
        screenshot: SCREENSHOTS.agendaHfr,
      },
      {
        step: 'Step 2',
        title: 'ライブ議事録を入力',
        desc: '議題ごとに入力。「a:」でアクション、「dec:」で決定事項として即座に分類し、担当者と期限を設定します。',
        screenshot: SCREENSHOTS.liveMinutesHfr,
      },
      {
        step: 'Step 3',
        title: '承認してブランドロゴ入りPDFを発行',
        desc: '「Approve minutes」で議事録をロックし、自社とクライアントのロゴ入りPDFを発行します。',
        screenshot: SCREENSHOTS.approveDialog,
      },
      {
        step: 'Step 4',
        title: 'アクションと課題を追跡',
        desc: 'My Tasks、カンバンボード、番号付き課題レジスター、毎朝のデスクトップ通知で確実にフォローします。',
        screenshot: SCREENSHOTS.tasksBoard,
      },
      {
        step: 'Step 5',
        title: '未完了項目を次回会議へ自動引き継ぎ',
        desc: '未完了のアクションと課題は元の番号のまま次回アジェンダに自動表示され、再入力は一切不要です。',
        screenshot: SCREENSHOTS.carryForward,
      },
    ],
    tourEyebrow: 'FULL FEATURE TOUR · 全23モジュール詳細',
    tourHeadline: 'Kaigiを構成する全23モジュール。',
    tourSub:
      'すべてのモジュールを実際の画面とともに紹介します。「Coming in v1.0」バッジのついた5モジュールはv1.0で登場予定、それ以外の18モジュールはすべて現在利用可能です。',
    filterAll: '全23モジュール',
    filterNow: '現在利用可能 (18)',
    filterV1: 'Coming in v1.0 (5)',
    comingInV1: 'Coming in v1.0',
    availableNow: '利用可能',
    moreDetails: '詳細を見る',
    lessDetails: '閉じる',
    expandAllMobile: 'すべて展開',
    collapseAllMobile: 'すべて折りたたむ',
    privacyEyebrow: 'プライバシーとデータ主権',
    privacyHeadline: 'あなたの会議データは、あなたのPCの中だけに。',
    privacySub:
      '機密性の高い建設プロジェクトや契約交渉、外部クラウドへのデータ送信が禁止されている組織でも安心して導入できるローカル設計です。',
    privacyPoints: [
      {
        title: 'インターネット接続なしで完全動作',
        body: '地下の現場事務所、クライアント先の会議室、飛行機内、閉域網でもすべての機能がそのまま使えます。',
      },
      {
        title: 'アカウント登録・サインイン不要',
        body: 'Windowsにインストールしてすぐに利用開始。ユーザー登録やクラウドログインは一切ありません。',
      },
      {
        title: 'データはPC内の1つのフォルダに集約',
        body: 'Windowsユーザープロファイル内の1フォルダにローカルDBと添付ファイルを格納。管理もバックアップも明確です。',
      },
      {
        title: 'AIもクラウドではなくあなたのPC上で動作',
        body: 'v1.0のAI議事録作成・質問機能もPC内でローカル実行されます。設定で完全にオフにすることも可能です。',
      },
      {
        title: 'Kaigiが勝手にメールを送信することはありません',
        body: 'PDFを添付したメールの下書きをお使いのメールアプリで開くだけ。内容を確認してご自身で送信できます。',
      },
      {
        title: '改ざんされないリビジョンと追記専用の監査ログ',
        body: '発行済みPDFは永久に保持され、再オープン時は理由を記録してRev 1、Rev 2を発行します。',
      },
    ],
    builtForEyebrow: 'BUILT FOR · 活用シーン',
    builtForHeadline: '現場のリアルな定例会議の進め方に合わせた設計。',
    editionsEyebrow: 'エディションとライセンス',
    editionsHeadline: 'Kaigi Liteは無料。Kaigi Proは業務の重労働を自動化。',
    editionsSub:
      'Windows 10/11共通の1つのインストーラー。無料のKaigi Liteから始めて、オフラインのライセンスキーでいつでもKaigi Proへアップグレードできます。',
    liteTitle: 'Kaigi Lite',
    litePrice: '無料 (Free)',
    liteSub: '進行中プロジェクト5件まで · 期間制限なし · 完全オフライン',
    liteFeatures: [
      'すべての会議基本機能：プロジェクト・名簿、シリーズ、アジェンダ、ライブ議事録、出席管理、承認・リビジョン管理',
      'アクション管理（My Tasks・一覧・カンバン）、課題レジスター、決定事項ログ、自動引き継ぎ、添付ファイル',
      '議事録PDF出力（フッターに小さな「Made with Kaigi Lite」表記）',
      'Outlookメール下書き作成とカレンダー招待（.ics）出力',
      '基本ダッシュボード、Ctrl+K 横断検索、デスクトップ通知リマインダー',
      'バックアップと復元（進行中プロジェクト最大5件まで）',
    ],
    proTitle: 'Kaigi Pro',
    proPrice: '[price]',
    proSub: 'プロジェクト数無制限 · オフラインライセンスキー',
    proFeatures: [
      'Kaigi Liteの全機能に加え、PDFフッターの「Made with Kaigi Lite」表記を非表示',
      '編集可能なWord（.docx）議事録出力と、プロジェクト全体のExcel台帳エクスポート',
      '既存のExcel管理表や過去のWord議事録のインポート（列マッピング・重複検知・Undo対応）',
      'フル機能ダッシュボード、テンプレート管理、Excel出力対応のAudit（監査）画面',
      'AI meeting assistant（.vtt/.docx・録音対応）と Ask your meetings（完全オフライン動作）',
      '進行中プロジェクト数の制限なし（無制限）',
    ],
    comparisonTitle: 'モジュール別 機能比較表（全23モジュール）',
    tableColModule: 'モジュール',
    tableColLite: 'Kaigi Lite (無料)',
    tableColPro: 'Kaigi Pro ([price])',
    dataNeverLockedNote:
      'データがロックされることはありません：エクスポートとバックアップは、すべてのエディションで常に利用可能です。',
    faqEyebrow: 'よくある質問 (FAQ)',
    faqHeadline: '導入前の疑問にお答えします。',
    finalCtaEyebrow: 'オフラインですぐに開始',
    finalCtaHeadline: '次の会議を、Kaigiで進めましょう。',
    finalCtaSub:
      'Windows 10 / 11 に1分以内でインストール完了。アカウント登録不要、クラウド設定不要。すぐに試せる架空のデモプロジェクトも同梱しています。',
    readUserGuide: 'ユーザーガイドを読む',
    footerCopyright: '© 2026 SGB Dev Apps',
    footerUserGuide: 'ユーザーガイド',
    footerPrivacy: 'プライバシー',
    footerContact: 'お問い合わせ: sgb.dev.apps@gmail.com',
    footerMadeFor: 'Made for Windows',
  },
};
