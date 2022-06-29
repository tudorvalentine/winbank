var elementsModule = (function () {
    var findClosestResultDiv = function (element) {
        if (!element) return null;
        var resultsDiv = $(element).closest(constantsModule.calcClassSelector).next();
        return resultsDiv;
    };
    var findClosestText = function (element) {
        if (!element) return null;
        var text = $(element).prev();
        return text;
    };
    var redBorder = function (element) {
        if (element == null || typeof (element.closest) === 'undefined') return null;
        $(element).addClass('red-border');
    };
    var removeRedBorder = function (element) {
        if (element == null || typeof (element.closest) === 'undefined') return null;
        $(element).removeClass('red-border');
    };
    var showErrorMessage = function (el, msg) {
        var errorDiv = findClosestResultDiv(el);
        if (!errorDiv) return;
        errorDiv.removeClass(constantsModule.successClass);
        errorDiv.addClass(constantsModule.errorClass);
        errorDiv.removeClass(constantsModule.hiddenClass);
        var template = jQuery.validator.format(constantsModule.errorSpan);
        var message = template(msg);
        errorDiv.html(message);
        var textField = elementsModule.findClosestText(el);
        elementsModule.redBorder(textField);
    };
    var showSuccessMessage = function (el, msg) {
        var errorDiv = findClosestResultDiv(el);
        if (!errorDiv) return;
        errorDiv.removeClass(constantsModule.errorClass);
        errorDiv.addClass(constantsModule.successClass);
        errorDiv.removeClass(constantsModule.hiddenClass);
        var template = jQuery.validator.format(constantsModule.successSpan);
        var message = template(msg);
        errorDiv.html(message);
    };
    var focus = function (el) {
        if (!el) return;
        var jQEl = $(el);
        jQEl.focus();
    };
    var removeErrorClass = function (el) {
        var errorDiv = findClosestResultDiv(el);
        if (!errorDiv) return;
        errorDiv.removeClass(constantsModule.errorClass);
        errorDiv.text("");
    };
    var disableEnableElement = function (el, dis) {
        if (!el) return;
        var theDisabledElement = $(el);
        if (theDisabledElement.length == 0) return;
        theDisabledElement.prop('disabled', dis);
        return theDisabledElement;
    }
    var disableElement = function (el) {
        disableEnableElement(el, true);
    }
    var enableElement = function (el) {
        disableEnableElement(el, false);
    }
    var getTxtValue = function (fieldId) {
        if (!fieldId) return null;
        var txt = $("#" + fieldId);
        if (txt.length == 0) return null;
        var theValue = $.trim(txt.val());
        return theValue;
    }
    var registerEnterToSubmit = function () {
        $("input[type='text'].text").on('keydown',
            function (e) {
                if (e.which != 13) return;
                e.preventDefault();
                var input = $(this);
                var submit = input.next();
                if (!submit || !input) return;
                submit.click();
            });
    }
    return {
        findClosestResultDiv: findClosestResultDiv,
        showErrorMessage: showErrorMessage,
        removeErrorClass: removeErrorClass,
        focus: focus,
        findClosestText: findClosestText,
        redBorder: redBorder,
        removeRedBorder: removeRedBorder,
        enableElement: enableElement,
        disableElement: disableElement,
        getTxtValue: getTxtValue,
        showSuccessMessage: showSuccessMessage,
        registerEnterToSubmit: registerEnterToSubmit
    }
})();