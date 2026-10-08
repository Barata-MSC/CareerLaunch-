import { Platform } from 'react-native';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import { formatPhone } from './validators';
 
// Escape user text so characters like < & " can't break the generated HTML.
const esc = (value = '') =>
  String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/\n/g, '<br/>');
 
function section(title, body) {
  return `<div class="section"><div class="section-title">${title}</div>${body}</div>`;
}
 
// Builds the printable HTML. Mirrors the layout of the on-screen preview.
export function buildResumeHtml(resumeData = {}, { native = false } = {}) {
  const info = resumeData.personalInfo || {};
  const education = resumeData.education || [];
  const skills = resumeData.skills || [];
  const experience = resumeData.experience || [];
  const certificates = resumeData.certificates || [];
  const projects = resumeData.projects || [];
 
  const contact = [info.email, info.phone ? formatPhone(info.phone) : '']
    .filter(Boolean)
    .map(esc)
    .join('&nbsp;&nbsp;•&nbsp;&nbsp;');
 
  const parts = [];
 
  if (info.summary?.trim()) {
    parts.push(section('PROFESSIONAL SUMMARY', `<div class="body">${esc(info.summary)}</div>`));
  }
 
  if (skills.length) {
    parts.push(section('CORE SKILLS', `<div class="body">${skills.map(esc).join('&nbsp;&nbsp;•&nbsp;&nbsp;')}</div>`));
  }
 
  if (experience.length) {
    parts.push(
      section(
        'PROFESSIONAL EXPERIENCE',
        experience
          .map(
            (item) => `
        <div class="item">
          <div class="row"><span class="item-head">${esc(item.company)}</span><span class="item-date">${esc(item.duration)}</span></div>
          <div class="item-sub">${esc(item.role)}</div>
          ${item.description ? `<div class="item-desc">${esc(item.description)}</div>` : ''}
        </div>`
          )
          .join('')
      )
    );
  }
 
  if (projects.length) {
    parts.push(
      section(
        'PROJECTS',
        projects
          .map(
            (item) => `
        <div class="item">
          <div class="item-head">${esc(item.title)}</div>
          ${item.link ? `<div class="item-link">${esc(item.link)}</div>` : ''}
          <div class="item-desc">${esc(item.description)}</div>
        </div>`
          )
          .join('')
      )
    );
  }
 
  if (education.length) {
    parts.push(
      section(
        'EDUCATION',
        education
          .map(
            (item) => `
        <div class="item">
          <div class="row"><span class="item-head">${esc(item.school)}</span><span class="item-date">${esc(item.year)}</span></div>
          <div class="item-sub">${esc(item.degree)}</div>
        </div>`
          )
          .join('')
      )
    );
  }
 
  if (certificates.length) {
    parts.push(
      section(
        'CERTIFICATIONS',
        certificates
          .map(
            (item) => `
        <div class="item">
          <div class="row"><span class="item-head">${esc(item.name)}</span><span class="item-date">${esc(item.year)}</span></div>
          <div class="item-sub">${esc(item.issuer)}</div>
        </div>`
          )
          .join('')
      )
    );
  }
 
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <style>
    @page { margin: 18mm; }
    * { box-sizing: border-box; }
    body { font-family: Helvetica, Arial, sans-serif; color: #3A3A3C; margin: 0; padding: ${native ? '36px' : '0'}; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    .photo { display: block; width: 90px; height: 90px; border-radius: 0; object-fit: cover; margin: 0 auto 10px auto; }
    .name { font-size: 24px; font-weight: 700; text-align: center; color: #1C1C1E; letter-spacing: 0.5px; margin-bottom: 4px; }
    .contact { font-size: 12px; text-align: center; color: #48484A; margin-bottom: 20px; }
    .section { border-top: 1px solid #3A3A3C; padding-top: 8px; margin-bottom: 16px; }
    .section-title { font-size: 12px; font-weight: 800; letter-spacing: 1px; color: #1C1C1E; margin-bottom: 8px; }
    .body { font-size: 13px; line-height: 1.5; }
    .item { margin-bottom: 10px; page-break-inside: avoid; }
    .row { display: flex; justify-content: space-between; align-items: baseline; }
    .item-head { font-size: 13px; font-weight: 700; color: #1C1C1E; }
    .item-date { font-size: 12px; color: #48484A; }
    .item-sub { font-size: 12px; font-style: italic; color: #48484A; margin-top: 1px; }
    .item-link { font-size: 11px; color: #5B21F5; font-weight: 600; margin-top: 1px; }
    .item-desc { font-size: 12px; line-height: 1.45; margin-top: 4px; }
  </style>
</head>
<body>
  ${info.photo ? `<img class="photo" src="${info.photo}" />` : ''}
  <div class="name">${esc(info.fullName || 'Your Name')}</div>
  <div class="contact">${contact}</div>
  ${parts.join('')}
</body>
</html>`;
}
 
// Creates the PDF and opens the share sheet (Save to Files / Drive / email...).
// On web it opens the browser print dialog, where "Save as PDF" is available.
export async function downloadResumePdf(resumeData) {
  // Web: the browser print dialog handles page size and margins (@page CSS).
  if (Platform.OS === 'web') {
    await Print.printAsync({ html: buildResumeHtml(resumeData) });
    return;
  }
 
  // iOS / Android: @page margins are ignored, so padding is added to the body,
  // and the page size is set to A4 (595 x 842 pt) instead of the US Letter default.
  const html = buildResumeHtml(resumeData, { native: true });
  const { uri } = await Print.printToFileAsync({
    html,
    width: 595,
    height: 842,
    base64: false,
  });
 
  if (!(await Sharing.isAvailableAsync())) {
    throw new Error('Sharing is not available on this device.');
  }
  await Sharing.shareAsync(uri, {
    mimeType: 'application/pdf',
    UTI: 'com.adobe.pdf',
    dialogTitle: 'Save or share your resume',
  });
}
 