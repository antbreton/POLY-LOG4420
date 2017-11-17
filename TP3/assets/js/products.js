"use strict"

$.getJSON("data/products.json", function(data) {
    data.sort((a,b) => {return a.price-b.price});
    $.each(data, (key,val) => {
        var $item = $("<a></a>");
        $item.attr("class", "rounded-border");
        $item.attr("href", "./product.html?id=" + val.id);
        $item.attr("title", "En savoir plus...");
        
        var $title = $("<h2>" + val.name + "</h2>");
        $item.append($title);

        var $image = $("<img></img>");
        $image.attr("alt", val.name);
        $image.attr("src", "./assets/img/" + val.image);
        $item.append($image);

        
        var $price = $("<p><small>Prix</small> " + val.price.toLocaleString("fr-CA", {useGrouping: false, minimumFractionDigits: 2, maximumFractionDigits: 2}) + "$</p>");
        $item.append($price);

        // Ajouter des infos pour sorting
        $item.data("price", val.price);
        $item.data("category", val.category);
        $item.data("name", val.name);

        $("#products-list").append($item);
    });
});
function sortBasHaut() {
    var elements = $("#products-list > a").detach();
    elements.sort(function (a,b) {return $(a).data("price") - $(b).data("price")});
    $("#products-list").append(elements);
} 

function sortHautBas() {
    var elements = $("#products-list > a").detach();
    elements.sort(function (a,b) {return $(b).data("price") - $(a).data("price")});
    $("#products-list").append(elements);
} 

function sortAZ() {
    var elements = $("#products-list > a").detach();
    elements.sort(function (a,b) {
        if ($(a).data("name").toLowerCase() > $(b).data("name").toLowerCase())
        { return 1 }
        if ($(a).data("name").toLowerCase() < $(b).data("name").toLowerCase())
        { return -1 }
        return 0;
    });
    $("#products-list").append(elements);
}

function sortZA() {
    var elements = $("#products-list > a").detach();
    elements.sort(function (a,b) {
        if ($(b).data("name").toLowerCase() > $(a).data("name").toLowerCase())
        { return 1 }
        if ($(b).data("name").toLowerCase() < $(a).data("name").toLowerCase())
        { return -1 }
        return 0;
    });
    $("#products-list").append(elements);
}

function sortCategory(cat) {
    var elements = $("#products-list > a");
    var count = 0;
    elements.each(function(i, e) {
        if (cat == "all") {
            count++;
            $(e).show();
        } else if ($(e).data("category") == cat)
        {
            count++;
            $(e).show();
        } else {
            $(e).hide();
        }
    });

    $("#products-count").text(count+ " produits");
}

function selectCategoryButton(i) {
    $("#product-categories > button").removeClass("selected");
    $("#product-categories > button:nth-child(" + i + ")").addClass("selected");
}

function selectSortButton(i) {
    $("#product-criteria > button").removeClass("selected");
    $("#product-criteria > button:nth-child(" + i + ")").addClass("selected");
}

$(document).ready(function () {
    $("#product-criteria > button:nth-child(1)").click(() => {sortBasHaut(); selectSortButton(1)});
    $("#product-criteria > button:nth-child(2)").click(() => {sortHautBas(); selectSortButton(2)});
    $("#product-criteria > button:nth-child(3)").click(() => {sortAZ(); selectSortButton(3)});
    $("#product-criteria > button:nth-child(4)").click(() => {sortZA(); selectSortButton(4)});

    $("#product-categories > button:nth-child(1)").click(() => {sortCategory("cameras"); selectCategoryButton(1)});
    $("#product-categories > button:nth-child(2)").click(() => {sortCategory("consoles"); selectCategoryButton(2)});
    $("#product-categories > button:nth-child(3)").click(() => {sortCategory("screens"); selectCategoryButton(3)});
    $("#product-categories > button:nth-child(4)").click(() => {sortCategory("computers"); selectCategoryButton(4)});
    $("#product-categories > button:nth-child(5)").click(() => {sortCategory("all"); selectCategoryButton(5)});
});
/*
<a class="rounded-border" href="./product.html" title="En savoir plus...">
    <h2>Manette Xbox 360</h2>
    <img alt="Manette Xbox 360" src="./assets/img/xbox-controller.png">
    <p><small>Prix</small> 29,99&thinsp;$</p>
</a>
*/