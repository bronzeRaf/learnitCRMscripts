/* New Course Service 

Script for adding a new course student in Learn It CRM database.

Author: Rafael Brouzos, Software Engineer, Github: bronzeRaf, Email: rnm1816@gmail.com

Written in 4/5/2020

*/

/* This function creates the html GUI for the form of the New Course Service */
function doGet(e) {
  return HtmlService.createHtmlOutputFromFile('forms.html').setTitle("New Course");
}

/* This function adds a course student to the database. It is the implementation of the New Course Service 
Input: student details, course details.

Result: new course student record in the database, with automatic id (unique increament) and link to new drive folder for course material
*/
function addCourseTodb(name, phone, email, university, faculty, year, info, comment, type, begin, deadline, professor, hourcost, hourprice, learnit) {
  
  try {
    // Open File and Sheet
    var target = SpreadsheetApp.openById("1fTHwZrmXkZQCmsdrD2dTatNlW6C34gmrMOCW085l3aQ");
    var target_sheet = target.getSheetByName("courses");
    
    // Sort the sheet by id
    var range = target_sheet.getDataRange();
    range.sort({column: 1, ascending: false});
    
    // Find new id for the new record
    var r1 = target_sheet.getRange("A2:A2");
    var last_id = r1.getValue();
    var new_id = last_id+1;
    
    // Add an empty row and select it
    target_sheet.insertRowBefore(2);
    var target_range = target_sheet.getRange("A2:AN2");
    
    // Receive current date
    var d = new Date()
    var date = Utilities.formatDate(d, "GMT+3", "dd/MM/yyyy");
    
    // Aply initiate state
    var state = "Να βρεθεί καθηγητής"
    
    // Create a folder for the new course material
    var course_folder = DriveApp.getFolderById("1Hq5W4atoUKfSmcOvElkq3w8yygU1TTLG");
    var new_folder = course_folder.createFolder(new_id);
    var link = new_folder.getUrl()
    
    // Set up the values from the form
    var values = [
    [ new_id, name, phone, email, "", "", university, faculty, year, info, "", 0, type, professor, date, begin, 
    deadline, state, "", link, "", "", "", hourcost, "", "", 0, hourprice, learnit, comment, "", "", "", "", "", 
    "", "", "", "", 0]
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