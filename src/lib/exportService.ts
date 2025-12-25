// src/lib/exportService.ts

export const exportToPDF = (elementId: string, filename: string) => {
  const content = document.getElementById(elementId);
  if (!content) return;

  const iframe = document.createElement('iframe');
  iframe.style.position = 'fixed';
  iframe.style.right = '0';
  iframe.style.bottom = '0';
  iframe.style.width = '0';
  iframe.style.height = '0';
  iframe.style.border = '0';
  document.body.appendChild(iframe);

  const pri = iframe.contentWindow;
  if (!pri) return;

  const styles = Array.from(
    document.querySelectorAll('link[rel="stylesheet"], style'),
  )
    .map((s) => s.outerHTML)
    .join('');

  pri.document.open();
  pri.document.write(`
    <html>
      <head>
        <title>${filename}</title>
        ${styles}
        <style>
          body { background: white !important; padding: 40px !important; margin: 0; }
          .no-print, button { display: none !important; }
          * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
        </style>
      </head>
      <body>
        ${content.innerHTML}
      </body>
    </html>
  `);
  pri.document.close();

  setTimeout(() => {
    pri.focus();
    pri.print();
    setTimeout(() => {
      document.body.removeChild(iframe);
    }, 1000);
  }, 500);
};
