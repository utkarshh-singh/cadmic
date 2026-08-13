// Cadmic contact form backend — Google Apps Script Web App.
// Bind this to the Google Sheet that collects contact-form submissions
// (Extensions > Apps Script in the Sheet), then deploy as a Web App.

var SERVICE_LABELS = {
  '1': 'Personal Research Websites',
  '2': 'Research Group Portals',
  '3': 'Postdoc Portfolios',
  '4': 'Custom Solutions',
  '5': 'Personal Portfolios',
  '6': 'Small Business Websites'
};

var NOTIFY_EMAIL = 'info.cadmic@gmail.com';

function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = e.parameter;
  var serviceLabel = SERVICE_LABELS[data.service] || data.service || '';

  sheet.appendRow([
    new Date(),
    data.name || '',
    data.email || '',
    data.phone || '',
    data.affiliation || '',
    serviceLabel,
    data.budget || '',
    data.timeline || '',
    data.existingWebsite || '',
    data.message || ''
  ]);

  try {
    MailApp.sendEmail({
      to: NOTIFY_EMAIL,
      subject: 'New Cadmic inquiry from ' + (data.name || 'website visitor'),
      body: [
        'Name: ' + (data.name || ''),
        'Email: ' + (data.email || ''),
        'Phone: ' + (data.phone || '-'),
        'Institution/Company: ' + (data.affiliation || '-'),
        'Service: ' + serviceLabel,
        'Budget: ' + (data.budget || '-'),
        'Timeline: ' + (data.timeline || '-'),
        'Existing website: ' + (data.existingWebsite || '-'),
        '',
        'Message:',
        data.message || ''
      ].join('\n')
    });
  } catch (err) {
    // Don't fail the submission if the notification email can't be sent —
    // the row is already saved in the sheet either way.
  }

  return ContentService
    .createTextOutput(JSON.stringify({ result: 'success' }))
    .setMimeType(ContentService.MimeType.JSON);
}
