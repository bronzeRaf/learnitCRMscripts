/* New Professor Service 

Script for adding a new professor in Learn It CRM database.

Author: Rafael Brouzos, Software Engineer, Github: bronzeRaf, Email: rnm1816@gmail.com

Written in 6/5/2020

*/

/* This function creates the html GUI for the form of the New Professor Service */
function doGet(e) {
  return HtmlService.createHtmlOutputFromFile('forms.html').setTitle("New Professor");
}

/* This function adds a professor to the database. It is the implementation of the New Professor Service 
Input: professor details.

Result: new professor record in the database, with automatic id (unique increament), link to new drive 
folder for cv and join date (current)
*/
function addProfessorTodb(name, mobile, phone, email, skype, field, exp, studies, grade, master, mastergrade, phd, courses, comment, cities, file, data) {
  
  try {
    // Open File and Sheet
    var target = SpreadsheetApp.openById("1fTHwZrmXkZQCmsdrD2dTatNlW6C34gmrMOCW085l3aQ");
    var target_sheet = target.getSheetByName("professors");
    
    // Sort the sheet by id
    var range = target_sheet.getDataRange();
    range.sort({column: 1, ascending: false});
    
    // Find new id for the new record
    var r1 = target_sheet.getRange("A2:A2");
    var last_id = r1.getValue();
    var new_id = last_id+1;
    
    // Add an empty row and select it
    target_sheet.insertRowBefore(2);
    var target_range = target_sheet.getRange("A2:AL2");
    
    
    // Receive current date
    var d = new Date()
    var date = Utilities.formatDate(d, "GMT+3", "dd/MM/yyyy")
    var deadline = Utilities.formatDate(new Date(d.getFullYear() +1, d.getMonth(), d.getDate()), "GMT+3", "dd/MM/yyyy")
    
     // Create a folder for the new course material
    var professor_folder = DriveApp.getFolderById("1Hq5W4atoUKfSmcOvElkq3w8yygU1TTLG");
    var new_folder = professor_folder.createFolder(new_id+" - "+name);
    var link = new_folder.getUrl()
    
    // Upload the cv file
    var contentType = data.substring(5,data.indexOf(';'));
    var bytes = Utilities.base64Decode(data.substr(data.indexOf('base64,')+7));
    var blob = Utilities.newBlob(bytes, contentType, new_id+" - "+name+" - cv - "+file);
    file = new_folder.createFile(blob);
        
    // Set up the values from the form
    var values = [
    [ new_id, name, mobile, phone, email, skype, field, exp, studies, grade, master, mastergrade, phd, courses, 
    comment, "", "", "", cities, "", link, date, "", "", "", "", "", "", "", "", "", "", "", "", "",
    "", "", 0]
    ];
    
    // Store the values to the sheet
    target_range.setValues(values);
    
    // Feedback
    return "OK";
    
  } catch (f) {
    return f.toString();
  }
  
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

Array.prototype.findIndex = function(search){
  if(search == "") return false;
  for (var i=0; i<this.length; i++)
    if (this[i] == search) return i;

  return -1;
} 