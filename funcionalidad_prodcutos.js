$(document).ready(function() {
    // Número total de páginas
    var totalPages = $("#pagination-list li.page-item").length - 2; // Excluyendo los botones "Anterior" y "Siguiente"

    // Página actual
    var currentPage = 1;

    // Función para actualizar la visibilidad de los botones "Anterior" y "Siguiente"
    function updatePaginationButtons() {
        if (currentPage === 1) {
            $("#previous-page").addClass("disabled");
        } else {
            $("#previous-page").removeClass("disabled");
        }

        if (currentPage === totalPages) {
            $("#next-page").addClass("disabled");
        } else {
            $("#next-page").removeClass("disabled");
        }
    }

    // Función para mostrar el contenido de la página actual y ocultar el resto
    function showCurrentPageContent() {
        // Ocultar todo el contenido de las páginas
        $(".page-content").hide();

        // Mostrar solo el contenido de la página actual
        $("#page-" + currentPage + "-content").show();

        // Actualizar la clase "active" en los elementos de la lista de páginas
        $("#pagination-list li.page-item").removeClass("active");
        $("#pagination-list li.page-item:nth-child(" + (currentPage + 1) + ")").addClass("active");
    }

    // Al hacer clic en el botón "Anterior"
    $("#previous-page").click(function(e) {
        e.preventDefault();
        if (currentPage > 1) {
            currentPage--;
            updatePaginationButtons();
            showCurrentPageContent();
        }
    });

    // Al hacer clic en el botón "Siguiente"
    $("#next-page").click(function(e) {
        e.preventDefault();
        if (currentPage < totalPages) {
            currentPage++;
            updatePaginationButtons();
            showCurrentPageContent();
        }
    });

    // Al hacer clic en un número de página
    $("#pagination-list li.page-item:not(#previous-page, #next-page)").click(function() {
        var pageNumber = parseInt($(this).text());
        if (pageNumber !== currentPage) {
            currentPage = pageNumber;
            updatePaginationButtons();
            showCurrentPageContent();
        }
    });

    // Inicializar el estado de los botones de paginación y mostrar la página inicial
    updatePaginationButtons();
    showCurrentPageContent();
});






    // JavaScript para manejar el cambio de páginas
    const pages = ['page-1-content', 'page-2-content', 'page-3-content'];
    let currentPageIndex = 0;

    function showPage(index) {
        pages.forEach(page => {
            if (page === pages[index]) {
                document.getElementById(page).style.display = 'block';
            } else {
                document.getElementById(page).style.display = 'none';
            }
        });
    }

    document.getElementById('previous-page').addEventListener('click', function (event) {
        event.preventDefault();
        if (currentPageIndex > 0) {
            currentPageIndex--;
            showPage(currentPageIndex);
        }
    });

    document.getElementById('next-page').addEventListener('click', function (event) {
        event.preventDefault();
        if (currentPageIndex < pages.length - 1) {
            currentPageIndex++;
            showPage(currentPageIndex);
        }
    });


    