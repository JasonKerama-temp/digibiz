let pdfjsLib = window["pdfjs-dist/build/pdf"];
// The workerSrc property shall be specified.
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://mozilla.github.io/pdf.js/build/pdf.worker.js';
var pdfjsHelper = {  

    laodPdfPages: async function (url = null, filename = null, callback) {
        const result = [];
        let numPages = 0;

        let loadingTask = pdfjsLib.getDocument(url);
        loadingTask.promise.then(async function (pdf) {
            pdfObject = pdf;
            var pdfPages = [];
            for (var num = 1; num <= pdfObject.numPages; num++) {
                await pdfObject.getPage(num).then(async function (page) {
                    // //console.log('eder',page.getAnnotations());
                    var list = {
                        pageIndex: num
                    }
                    pdfPages.push(list);
                    if (num == pdfObject.numPages) {
                        splitPdfTemplate(pdfPages, url, filename, function () {
                            removeLoader();
                            pdfjsHelper.renderPages(pdfObject, function () { });
                        });
                    }
                    // var scale = 1.5;
                    // var viewport = page.getViewport({ scale: scale });
                    // // var canvas = $("#pdfViewer")[0];
                    // var canvas = document.getElementById('pdfViewer');
                    // var context = canvas.getContext('2d');
                    // canvas.height = viewport.height;
                    // canvas.width = viewport.width;
                    // var renderContext = {
                    //     canvasContext: context,
                    //     viewport: viewport
                    // };
                    // var renderTask = page.render(renderContext);
                    // renderTask.promise.then(function () {
                    //     //console.log('Page rendered');
                    // });
                });
            }
        }, function (reason) {
            // PDF loading error
            //console.error(reason);
        });
    },

    renderPages: async function (pdfObject, callback) {
        var parent = document.getElementById("pdf-page-wrapper")
        for (var num = 1; num <= pdfObject.numPages; num++) {
            await pdfObject.getPage(num).then(async function (page) {
                var scale = 1.5;
                var viewport = page.getViewport({ scale: scale });
                // var canvas = $("#pdfViewer")[0];
                var canvas = document.getElementById(`pdfViewer_${num}`);
                var context = canvas.getContext('2d');
                // canvas.toBlob(function (blob) {
                //     //console.log('blob', blob);
                //     var img = new Image;
                //     img.src = URL.createObjectURL(blob);
                //     //console.log('img', img);
                //     $(`#pdf_page_preview_${num}`).append(img);
                // }, 'image/png');
                canvas.height = viewport.height;
                canvas.width = viewport.width;
                var renderContext = {
                    canvasContext: context,
                    viewport: viewport
                };
                var renderTask = page.render(renderContext);
                renderTask.promise.then(function () {

                });
            });
        }
    }

}