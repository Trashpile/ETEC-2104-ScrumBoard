
$(document).ready ( (data) => {
    let file;
    function insert_data(in_file){
    return file = in_file;
    }
    console.log("doc ready");

    let form = $("#form");
    form.append( $("<div>").text("Choose a file to upload."));
    let fileInput = $("<input>");
    fileInput.prop("type", "file");
    form.append(fileInput);
    form.append($("<P>"));
    

    
    let view = $("#preview");
    let viewData = $("#previewData");
    view.append($("<P>"));
    let previewButton = $("<button>");
    previewButton.text("Preview");
    view.append(previewButton);

    let removeButton = $("<button>");
    removeButton.text("Remove Preview");
    view.append(removeButton);

    view.append( $("<P>"));
    let uploadButton = $("<button>");
    uploadButton.text("Upload File");
    view.append(uploadButton);

    

    removeButton.click(() => {
        viewData.empty();
    });
    
    previewButton.click(() => {
        viewData.empty();
        console.log("preview clicked");
        let F = fileInput.prop("files")[0];

        // https://stackoverflow.com/questions/4459379/preview-an-image-before-it-is-uploaded/27002935#27002935?newreg=71217f890a7645deb120c6c1e2f32bae
        let url = window.URL.createObjectURL(F);  
        viewData.append( $("<img src=" + url +"> </img>"));
    });
    


    uploadButton.click( () => {
        console.log("upload clicked");
        let newread = new FileReader();
        let F = fileInput.prop("files")[0];
        newread.onload = () => {
            $.post(
                "/sendimage",
                {
                    img: newread.result
                },
                (data, status, xhr) =>{
                    console.log("On preview click", data, status);
                }
            );
        };
        newread.readAsDataURL(F);
    });
});