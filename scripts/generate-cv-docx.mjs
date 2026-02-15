/**
 * generate-cv-docx.mjs
 *
 * Generates a Word document (.docx) from the structured CV data.
 * Run: node scripts/generate-cv-docx.mjs
 * Output: public/cv/suchema-cv.docx
 */

import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
  BorderStyle,
  TabStopType,
  TabStopPosition,
} from 'docx';
import { readFileSync, writeFileSync, mkdirSync } from 'fs';

const cv = JSON.parse(readFileSync('./src/data/cv.json', 'utf-8'));

// Helper: create a horizontal rule paragraph
function createDivider() {
  return new Paragraph({
    border: {
      bottom: { style: BorderStyle.SINGLE, size: 1, color: '999999' },
    },
    spacing: { after: 200, before: 200 },
  });
}

// Helper: create a section heading
function createSectionHeading(text) {
  return new Paragraph({
    children: [
      new TextRun({
        text: text.toUpperCase(),
        bold: true,
        size: 20,
        font: 'Calibri',
        color: '666666',
      }),
    ],
    spacing: { before: 300, after: 100 },
    border: {
      bottom: { style: BorderStyle.SINGLE, size: 1, color: 'CCCCCC' },
    },
  });
}

const doc = new Document({
  creator: cv.name,
  title: `${cv.name} — CV`,
  description: cv.summary,
  sections: [
    {
      properties: {
        page: {
          margin: {
            top: 720,  // 0.5 inch
            right: 1080,
            bottom: 720,
            left: 1080,
          },
        },
      },
      children: [
        // Name
        new Paragraph({
          children: [
            new TextRun({
              text: cv.name,
              bold: true,
              size: 44,
              font: 'Calibri',
            }),
          ],
          spacing: { after: 40 },
        }),

        // Title
        new Paragraph({
          children: [
            new TextRun({
              text: cv.title,
              size: 24,
              font: 'Calibri',
              color: '666666',
            }),
          ],
          spacing: { after: 80 },
        }),

        // Contact
        new Paragraph({
          children: [
            new TextRun({
              text: `${cv.contact.location} · ${cv.contact.email} · ${cv.contact.website.replace('https://', '')}`,
              size: 18,
              font: 'Calibri',
              color: '888888',
            }),
          ],
          spacing: { after: 200 },
        }),

        createDivider(),

        // Summary
        createSectionHeading('Summary'),
        new Paragraph({
          children: [
            new TextRun({
              text: cv.summary,
              size: 20,
              font: 'Calibri',
            }),
          ],
          spacing: { after: 200 },
        }),

        // Experience
        createSectionHeading('Experience'),
        ...cv.experience.flatMap((job) => [
          new Paragraph({
            tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX }],
            children: [
              new TextRun({
                text: `${job.company}`,
                bold: true,
                size: 22,
                font: 'Calibri',
              }),
              new TextRun({
                text: `\t${job.period}`,
                size: 18,
                font: 'Calibri',
                color: '888888',
              }),
            ],
            spacing: { before: 160, after: 40 },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `${job.role} — ${job.location}`,
                italics: true,
                size: 20,
                font: 'Calibri',
                color: '666666',
              }),
            ],
            spacing: { after: 80 },
          }),
          ...job.highlights.map(
            (h) =>
              new Paragraph({
                children: [
                  new TextRun({
                    text: h,
                    size: 20,
                    font: 'Calibri',
                  }),
                ],
                bullet: { level: 0 },
                spacing: { after: 40 },
              })
          ),
        ]),

        // Education
        createSectionHeading('Education'),
        ...cv.education.flatMap((edu) => [
          new Paragraph({
            tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX }],
            children: [
              new TextRun({
                text: edu.institution,
                bold: true,
                size: 22,
                font: 'Calibri',
              }),
              new TextRun({
                text: `\t${edu.period}`,
                size: 18,
                font: 'Calibri',
                color: '888888',
              }),
            ],
            spacing: { before: 160, after: 40 },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: edu.degree,
                italics: true,
                size: 20,
                font: 'Calibri',
                color: '666666',
              }),
            ],
            spacing: { after: 80 },
          }),
        ]),

        // Skills
        createSectionHeading('Skills'),
        new Paragraph({
          children: [
            new TextRun({
              text: 'Technical: ',
              bold: true,
              size: 20,
              font: 'Calibri',
            }),
            new TextRun({
              text: cv.skills.technical.join(', '),
              size: 20,
              font: 'Calibri',
              color: '444444',
            }),
          ],
          spacing: { after: 80 },
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: 'Leadership: ',
              bold: true,
              size: 20,
              font: 'Calibri',
            }),
            new TextRun({
              text: cv.skills.leadership.join(', '),
              size: 20,
              font: 'Calibri',
              color: '444444',
            }),
          ],
          spacing: { after: 80 },
        }),
      ],
    },
  ],
});

// Generate and write the file
mkdirSync('./public/cv', { recursive: true });
const buffer = await Packer.toBuffer(doc);
writeFileSync('./public/cv/suchema-cv.docx', buffer);
console.log('✓ Generated public/cv/suchema-cv.docx');
