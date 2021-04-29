
$(document).ready(() => {
    console.log("doc ready");

    // File input
    let form = $("#form");
    form.append($("<div>").text("Select a PNG, GIF, or JPEG file to upload. The file size is limited to 1MB."));
    let fileInput = $("<input>");
    fileInput.prop("type", "file");
    form.append(fileInput);
    form.append($("<P>"));
    let errorDiv = $("#error");

    // Preview buton
    let view = $("#preview");
    let viewData = $("#previewData");
    view.append($("<P>"));
    let previewButton = $("<button>");
    previewButton.text("Preview");
    view.append(previewButton);

    previewButton.click(() => {
        viewData.empty();
        console.log("preview clicked");
        let F = fileInput.prop("files")[0];
        let size = fileInput.prop("files")[0].size / 1024;
        if (size > 1024){
            alert("Warning: File exceeds 1MB");
        }

        // https://stackoverflow.com/questions/4459379/preview-an-image-before-it-is-uploaded/27002935#27002935?newreg=71217f890a7645deb120c6c1e2f32bae
        let url = window.URL.createObjectURL(F);
        viewData.append($("<img src=" + url + "> </img>"));
    });

    // Remove button
    let removeButton = $("<button>");
    removeButton.text("Remove Preview");
    view.append(removeButton);

    removeButton.click(() => {
        viewData.empty();
    });

    // Upload button
    view.append($("<P>"));
    let uploadButton = $("<button>");
    uploadButton.text("Upload File");
    view.append(uploadButton);

    uploadButton.click(() => {
        console.log("upload clicked");
        let newread = new FileReader();
        let F = fileInput.prop("files")[0];
        newread.onload = () => {
            $.post(
                "/sendimage",
                {
                    img: newread.result
                },
                (data, status, xhr) => {
                    console.log("On upload click,", data, status, xhr);
                    if (data === "OK"){
                        alert("File uploaded!");
                    }
                    else if (data === "error")
                        alert("File type or size error.")
                }
            );
        };
        newread.readAsDataURL(F);
    });
});
