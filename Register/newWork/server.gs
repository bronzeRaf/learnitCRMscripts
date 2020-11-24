/* New Work Service 

Script for adding a new work student in Learn It CRM database.

Author: Rafael Brouzos, Software Engineer, Github: bronzeRaf, Email: rnm1816@gmail.com

Written in 5/5/2020

*/

/* This function creates the html GUI for the form of the New Work Service */
function doGet(e) {
  return HtmlService.createHtmlOutputFromFile('forms.html').setTitle("New Work");
}

/* This function adds a work student to the database. It is the implementation of the New Work Service 
Input: student details, work details.

Result: new work student record in the database, with automatic id (unique increament) and link to new drive folder for work material
*/
function addWorkTodb(name, phone, email, university, faculty, year, info, comment, type, begin, deadline, words, professor, cost, price, learnit) {
  
  try {
    // Open File and Sheet
    var target = SpreadsheetApp.openById("1fTHwZrmXkZQCmsdrD2dTatNlW6C34gmrMOCW085l3aQ");
    var target_sheet = target.getSheetByName("works");
    
    // Sort the sheet by id
    var range = target_sheet.getDataRange();
    range.sort({column: 1, ascending: false});
    
    // Find new id for the new record
    var r1 = target_sheet.getRange("A2:A2");
    var last_id = r1.getValue();
    var new_id = last_id+1;
    
    // Add an empty row and select it
    target_sheet.insertRowBefore(2);
    var target_range = target_sheet.getRange("A2:AV2");
    
    // Receive current date
    var d = new Date()
    var date = Utilities.formatDate(d, "GMT+3", "dd/MM/yyyy");
    
    // Aply initiate state
    var state = "Να βρεθεί καθηγητής"
    
    // Create a folder for the new course material
    var course_folder = DriveApp.getFolderById("1rTjScFv4XvdSi53JCv2MlFnAB7pF9Tzx");
    var new_folder = course_folder.createFolder(new_id);
    var link = new_folder.getUrl()
    
    // Set up the values from the form
    var values = [
    [ new_id, name, phone, email, "", "", university, faculty, year, type, info, "", "", "", words, "", 
    "", "", "", "", "", date, deadline, begin, state, link, "", comment, "", "",professor, cost, price, 
    "", "", "", "", "", "", "", "", "", "", learnit, "", 0, "", ""]
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