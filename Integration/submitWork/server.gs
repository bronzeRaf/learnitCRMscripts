/* New Work Service 

Script for adding a new course student in Learn It CRM database.

Author: Rafael Brouzos, Software Engineer, Github: bronzeRaf, Email: rnm1816@gmail.com

Written in 27/5/2020

*/

/* This function creates the html GUI for the form of the New Course Service */
function doGet(e) {
    var id = e.parameter.id
    var name = e.parameter.name
    // Create a folder for the new course material
    var course_folder = DriveApp.getFolderById("1_aVwd2LhEmKa06yAr5IUCGzHzeu0oNnL");
    var new_folder = course_folder.createFolder(id+" "+name);
    var link = new_folder.getUrl()
    var public = new_folder.createFolder("public");
    var p = new_folder.createFolder("παραδοτέα");
    var a = new_folder.createFolder("αρχικό υλικό");
  
    return ContentService.createTextOutput(link);
}

