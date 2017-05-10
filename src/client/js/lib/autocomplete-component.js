var autoCompleteWidget = Class.extend({

    init: function(endpoint, queryParam="search"){
        this.endpoint = endpoint;
        this.queryParam = queryParam;
        this.formElem = $("#current-step-form");
        this.resultListContainerElem = $(".gp-finder-results");
        this.autoCompleteInput = $("#gp-search");
        $('#register-step-form').on('keyup keypress', this.stepFormKeyPressHandler.bind(this));

        this.autoCompleteInput.on('keyup', this.autoCompleteInputKeyUpHandler.bind(this));
        this.autoCompleteInput.on('keydown', this.autoCompleteInputKeyDownHandler.bind(this));
        this.resultListContainerElem.on("click", ".result", this.resultItemClickHandler.bind(this));
    },

    getResultTemplate: function() {
        return $.parseHTML('' +
            '<div class="result">' +
            '<h2 class="result-title"></h2>' +
            '<p class="address"></p>' +
            '<p class="person">' +
            '<span></span>' +
            '</div>'
        )
    },

    selectGP: function(elem){
        $("#gp-code").val(elem.data("code"));
        $("#gp-name").val(elem.data("name"));
        $("#gp-address").val(elem.data("address"));
        this.formElem.submit();
    },

    cleanSelectedGP: function(){
        $("#gp-code").val("");
        $("#gp-name").val("");
        $("#gp-address").val("");
    },

    stepFormKeyPressHandler: function(e){
        console.log("form keypress");
        var keyCode = e.keyCode || e.which;
        if (keyCode === 13) {
            e.preventDefault();
            return false;
        }
    },

    resultItemClickHandler: function (e) {
        this.resultListContainerElem.find(".result").removeClass("active");
        var selectedElem = $(e.target).closest(".result");
        selectedElem.addClass("active");
        this.selectGP(selectedElem);
    },

    autoCompleteInputKeyUpHandler: function(e){
        console.log("input keyup");
        var keyCode = e.keyCode || e.which;
        if (keyCode == 40 || keyCode == 38 || keyCode == 13){
            return false;
        }

        this.cleanSelectedGP();
        var keywords = $(e.target).val();
        if (keywords){
            clearTimeout(this.timer);
            this.timer = setTimeout(this.fetchList.bind(this, this.endpoint, this.queryParam, keywords), 400);
        }else{
            this.resultListContainerElem.empty();
        }
    },

    autoCompleteInputKeyDownHandler: function (e) {
        var elem = this.resultListContainerElem;
        if (elem.children().length > 0){
            if (e.keyCode == 40){  // up
                elem.find(".result.active").removeClass("active").next().addClass("active");
                if (!elem.find(".result.active").length){
                    elem.find(".result").first().addClass("active");
                }
            }

            if (e.keyCode == 38){  //down
                elem.find(".result.active").removeClass("active").prev().addClass("active");
                if (!elem.find(".result.active").length){
                    elem.find(".result").last().addClass("active");
                }
            }
            if (e.keyCode == 13){
                var selectedElem = elem.find(".result.active");
                this.selectGP(selectedElem);
                return false
            }
        }
    },

    appendResultListItem: function (i, d) {
        var template = this.getResultTemplate();
        var item = $(template).clone();
        item.find(".result-title").text(d.name.value);
        item.find(".address").text(d.address.value);
        var gpData = {
            "code": d.code,
            "name": d.name.value || "",
            "address": d.address.value || ""
        };
        item.data(gpData);
        if (i==0){
            item.addClass("active")
        }

        if (i >= 4){
            item.hide();
        }

        this.resultListContainerElem.append(item);
    },

    fetchList: function (endpoint, queryParam, keywords) {
        var showFirstItemNumber = 4;
        var showTotalItemNumber = 20;
        var queryData = {};
        queryData[queryParam] = keywords;
        $.ajax({
            type: "get",
            url: endpoint,
            data: queryData,
            dataType: "json",
            cache: false,
            success: function(data){
                var gpList = data.slice(0, showTotalItemNumber);
                $.each(gpList, this.appendResultListItem.bind(this));
            }.bind(this)
        });
    }
});