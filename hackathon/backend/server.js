const puppeteer = require("puppeteer");
const express = require("express");

const app = express();

app.use(express.json());

app.post("/screenshot/:doc_id", async (req, res) => {
  let docu_id = req.params.doc_id;
  const { student_name, date, subject, faculty, incharge_name } = req.body;

  console.log(req.body);
  console.log(docu_id);
  //opens the browser
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  //loads the url
  await page.goto("https://auth.revvsales.com/signin");

  //authentication
  await page.type("#signin-email-field", "singhricha0724@gmail.com");
  await page.click("#signin-email-continue-btn");
  await page.waitForTimeout(2000);
  await page.type("#signin-password-field", "richa@2020");

  //navigating to landing page
  await Promise.all([
    page.waitForNavigation(), // The promise resolves after navigation has finished
    page.click("#signin-button-field"), // Clicking the link will indirectly cause a navigation
  ]);

  //navigating to the document editing page
  await Promise.all([
    page.waitForNavigation(), // The promise resolves after navigation has finished
    page.goto(`https://ft6ag616.revvsales.com/documents/${docu_id}`), // Clicking the link will indirectly cause a navigation
  ]);
  await page.waitForTimeout(2000);

  //entering values in the form fields
  await page.waitForSelector(".revv-inp");
  await page.focus(".revv-inp");
  await page.keyboard.type(student_name, { delay: 100 });
  await page.keyboard.press("Tab");

  await page.keyboard.type(date, { delay: 100 });
  await page.keyboard.press("Tab");

  await page.keyboard.type(subject, { delay: 100 });
  await page.keyboard.press("Tab");

  await page.keyboard.type(faculty, { delay: 100 });
  await page.keyboard.press("Tab");

  await page.keyboard.type(incharge_name, { delay: 100 });
  await page.keyboard.press("Tab");

  await page.waitForTimeout(2000);

  await page.click('[data-test="document-form-docmode-button"]');

  //taking screenshot of the page

  //close the browser. now with the help of doc_no, doc_id and object_id, you can create a magic link of the document using revvsales api's
  await browser.close();
  res.json({ success: true });
});

app.listen(process.env.PORT);
