This site holds the source code of the tradedutyrefund.com, fr.tradedutyrefund.com and it.tradedutyrefund.com sites.
Updates to sites must be done in this repo.
The building process creates 3 outputs: tdrENBuild, tdrFRBuild and tdrITBuild. Those outputs have their own repos hosted on github pages.

** To update tradedutyrefund.com, fr.tradedutyrefund.com and it.tradedutyrefund.com, run 'npm run build' in this repo, save all commits (including those in the built directories) and synchronise with Github. **

Do not forget to request an indexation from Google Search Console after page updates.

# Website Structure
## Pages
Pages are html files located in the src folder..

## Blocks
Pages are made of blocks which hold repeatable code of HTML. All blocks are copied in the blocks folder.

## Localization
Localized text and urls are copied at building time. Local files are copied in the lang folder

## Build
Build process uses gulp.

## Template documentation

https://docs.semicolonweb.com/ and https://canvastemplate.com/

## Ebook Page
The page url is set on the advertissement banner. Users who click on the banner are directed to this page.
They are requested to leave their name and email address to receive a link to download the ebook.
The form submits to staticforms.xyz
staticforms.xyz sends an email to ebook@tradedutyrefund.com for every form submitted
The Google appScript "Ebook Email Automation" file (in the Drive Website folder) checks every minute for incoming email, parse new email to extract user email and generates an email with a link to download.

