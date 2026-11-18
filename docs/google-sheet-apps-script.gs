/**
 * VIBEART waitlist → Google Sheet
 *
 * Setup:
 * 1. Create a Google Sheet
 * 2. Extensions → Apps Script → paste this file
 * 3. Run once: setupSheet()
 * 4. Deploy → New deployment → Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 5. Copy the Web App URL
 * 6. In Vercel → Project → Settings → Environment Variables:
 *      SUBSCRIBE_WEBHOOK_URL = <that URL>
 * 7. Redeploy
 */

function setupSheet() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet()
  sheet.clear()
  sheet.appendRow(['createdAt', 'email', 'category', 'locale', 'source'])
  sheet.setFrozenRows(1)
}

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents)
    const email = String(data.email || '')
      .trim()
      .toLowerCase()
    const category = String(data.category || '')
    const locale = String(data.locale || '')
    const createdAt = String(data.createdAt || new Date().toISOString())
    const source = String(data.source || 'vibeart')

    if (!email) {
      return json_({ error: 'invalid_email' }, 400)
    }

    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet()
    const values = sheet.getDataRange().getValues()
    for (let i = 1; i < values.length; i++) {
      if (String(values[i][1]).toLowerCase() === email) {
        return json_({ error: 'duplicate' }, 409)
      }
    }

    sheet.appendRow([createdAt, email, category, locale, source])
    return json_({ ok: true, id: email }, 201)
  } catch (err) {
    return json_({ error: 'server_error', message: String(err) }, 500)
  }
}

function json_(body, status) {
  // Apps Script web apps don't set real HTTP status easily for all clients,
  // so we also encode status in the body for the Vercel function to read.
  const out = Object.assign({ status: status }, body)
  return ContentService.createTextOutput(JSON.stringify(out)).setMimeType(
    ContentService.MimeType.JSON,
  )
}
