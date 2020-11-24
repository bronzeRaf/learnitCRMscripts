/*************************************************************
This is a Google Spreadsheet project using Google Scripts.

This project receives an id from a clients and creates the link of the client into the Learn-It CRM.
Event : put an id of an english student in the spreadsheet.
Functionality: creates a hyperlink to the Learn-it CRM, to the tab of this client.

24/11/2020 Raf Bronze rnm1816@gmail.com
 *************************************************************/

function onEdit(e){
  // Set a comment on the edited cell to indicate when it was changed.
  
  // Obtain event
  var range = e.range;
  var sheet = range.getSheet();
  var spreadsheet = sheet.getParent();
  var cell = range.getCell(1, 1);
  
  
  // obtain spreadsheet and sheet ids
  var sheetID = sheet.getSheetId();
  var spreadsheetID = spreadsheet.getId();
  //var cell = SpreadsheetApp.getActiveSheet().getActiveCell();
  
  
  
  /*
  //Debugg
  Logger.log("**new edit**");
  Logger.log("spreadsheetID "+spreadsheetID);
  Logger.log("sheetID "+sheetID);
  Logger.log("column "+range.getColumn());
  
  //End Debugg
  */
  
  
  // Check if we are in the correct File
  if (spreadsheetID == "11Ys_IP3KiR-rtrNepoHwWqDqVpVuSViMpIftcDSC0Yk"){
    // Check if we are in the correct Sheet
    if (sheetID == "1743451913"){
      // Check if we are in the correct Column
      if(range.getColumn() == 3){
        
        //append the value to the link
        var link = "https://www.learn-it.gr/edu/app/agglika/edit.php?id=";
        var id = range.getValue();
        var newvalue = link+id;
        
        // Build rich text
        const rich = SpreadsheetApp.newRichTextValue()
          .setText('CRM')
          .setLinkUrl(newvalue)
          .build();
        
        // Put the new value into the cell
        cell.setRichTextValue(rich);
        
      }
    }
  }
  
  
  
  
  
  
}