//= ../../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js
//= ../../node_modules/jquery/dist/jquery.slim.min.js
//= ../../node_modules/bootstrap-select/dist/js/bootstrap-select.min.js
//= ../../node_modules/owl.carousel/dist/owl.carousel.min.js


//= https://www.google.com/recaptcha/api.js


$(function() {
    initSelectPicker();
    initFormValidation();
    addScrolledClassToNavbarOnScroll();
    setupSubscriptionFormAlerts();
});

function initSelectPicker() {
    $('.selectpicker').selectpicker();
    const selectPickers = document.querySelectorAll('.selectpicker')
    selectPickers.forEach(function(picker) {
        picker.addEventListener('invalid', (e) => {
            console.log("e", picker.value);
            const parentControl = picker.closest('.dropdown.bootstrap-select');
            if (parentControl) {
                parentControl.classList.add('is-invalid')
                picker.addEventListener("change", (e) => {
                    parentControl.classList.remove('is-invalid')
                }, { once: true });
            }
        })
    });
}

function initFormValidation() {
    const forms = document.querySelectorAll('.needs-validation')
    Array.from(forms).forEach(form => {
        if (form.id == 'accountForm') {
            form.addEventListener('submit', event => validateSubscribeUsForm(event, form));
        } else {
            form.addEventListener('submit', event => genericFormsValidation(event, form));
        }
    })
}

function validateSubscribeUsForm(event, form) {
    event.preventDefault()
    event.stopPropagation()

    if (form.checkValidity()) {
        // TODO: send request to server

        // cleanup the data
        form.reset();
        form.classList.remove('was-validated')

        var confirmationModal = new bootstrap.Modal(document.getElementById('requestAcceptedModal'))
        confirmationModal.show();

    } else {
        form.classList.add('was-validated')
        validatePhoneNumber(form);
        validatePinCode(form);
    }
}

function validatePhoneNumber(form) {
    const phoneNumber = form.querySelector("#phoneNumber");
    if (phoneNumber) {
        const alert = form.querySelector(phoneNumber.dataset.alertId);
        if (alert) {
            alert.classList.toggle("d-none", phoneNumber.checkValidity());
        }
    }
}

function validatePinCode(form) {
    const pinCode = form.querySelector("#pinCode");
    if (pinCode) {
        const pinInputs = pinCode.querySelectorAll('.pin-input');
        let isValid = true;
        pinInputs.forEach(pinInput => {
            if (!pinInput.checkValidity()) {
                isValid = false;
            }
        })
        const alert = form.querySelector(pinCode.dataset.alertId);
        if (alert) {
            alert.classList.toggle("d-none", isValid);
        }
    }
}

function setupSubscriptionFormAlerts() {
    const subscriptionForm = document.querySelector('#accountForm');
    if (subscriptionForm) {
        const alerts = subscriptionForm.querySelectorAll('.alert-dismissible');
        alerts.forEach(alert => {
            const closeButton = alert.querySelector('.btn-close');
            closeButton.addEventListener('click', e => {
                alert.classList.add('d-none');
            })
        });

    }
}

function genericFormsValidation(event, form) {
    if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
    }

    form.classList.add('was-validated')
}

/**
 * carousel setup
 */
$(function() {
    if ($('.video .owl-carousel').length > 0) {
        $('.video .owl-carousel').owlCarousel({
            loop: true,
            margin: 10,
            responsiveClass: true,
            autoplay: false,
            autoplayTimeout: 3000,
            nav: false,
            dots: false,

            responsive: {
                0: {
                    items: 2,
                    stagePadding: 46
                },
                576: {
                    items: 3,
                    stagePadding: 10
                },
                768: {
                    items: 3,
                    stagePadding: 10
                },
                992: {
                    items: 4,
                    stagePadding: 10
                },
                1200: {
                    items: 5,
                    stagePadding: 40
                }
            }
        })
    }
});

$(function() {
    if ($('.video-detail .owl-carousel').length > 0) {
        $('.video-detail .owl-carousel').owlCarousel({
            loop: true,
            margin: 10,
            responsiveClass: true,
            autoplay: false,
            autoplayTimeout: 3000,
            nav: false,
            dots: false,

            responsive: {
                0: {
                    items: 2,
                    stagePadding: 80
                },
                991: {
                    items: 3
                },
                992: {
                    items: 3
                }
            }
        })
    }
});

$(function() {
    if ($('.hero .owl-carousel').length > 0) {
        $('.hero .owl-carousel').owlCarousel({
            loop: true,
            margin: 10,
            responsiveClass: true,
            autoplay: false,
            autoplayTimeout: 3000,
            nav: false,
            dots: true,

            responsive: {
                0: {
                    items: 1,
                    stagePadding: 25
                },
                576: {
                    items: 1
                }
            }
        })
    }
});

$(function() {
    if ($('.screenshoots .owl-carousel').length > 0) {
        $('.screenshoots .owl-carousel').owlCarousel({
            loop: true,
            margin: 10,
            responsiveClass: true,
            autoplay: false,
            autoplayTimeout: 3000,
            nav: false,
            dots: false,

            responsive: {
                0: {
                    items: 1,
                    stagePadding: 40
                },
                414: {
                    items: 2,
                    stagePadding: 80
                },
                768: {
                    items: 3,
                    stagePadding: 80
                },
                992: {
                    items: 4,
                    stagePadding: 80
                }
            }
        })
    }
});

/**
 * navbar scrolled
 */
function addScrolledClassToNavbarOnScroll() {
    const navbar = document.querySelector('.top-navbar')
    if (!navbar) return;

    const updateScrolledState = () => {
        navbar.classList.toggle('scrolled', window.scrollY != 0);
    }

    window.addEventListener('scroll', (e) => {
        updateScrolledState();
    })

    updateScrolledState();
}

/**
 * File picker
 */
$(function() {
    $('#attachment-file-input').on('change', function(e) {
        $('.attachment-file-name').text(this.files[0].name)
    });

    $('.chose-attachment-file-btn').on('click', function(e) {
        e.preventDefault();
        $("#attachment-file-input").click();
    })
})

/**
 * Navbar toggler
 */
$(function() {
    var menuToggler = document.querySelector('.navbar .dropdown-toggle');
    var navbar = document.querySelector('.navbar');
    if (!navbar || !menuToggler) return;

    menuToggler.addEventListener('shown.bs.dropdown', function() {
        navbar.classList.add('menu-visible')
    });

    menuToggler.addEventListener('hidden.bs.dropdown', function() {
        navbar.classList.remove('menu-visible')
    });
});

/*
 DO NOT USER THIS CODE IN THE REAL PROJECT
 It handles ?rtl=true query param for testing rtl.
*/
$(function() {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    if (params.rtl == 'true') {
        $('html').attr('lang', 'ar');
        $('html').attr('dir', 'rtl');

        $('link[rel=stylesheet]').each(function() {
            console.log(this);
            this.disabled = true;
        });

        $('head').append('<link rel="stylesheet" href="css/bootstrap.rtl.min.css">');
        $('head').append('<link rel="stylesheet" href="css/style.css"></link>');
    }
});

/**
 * Search controller
 */
$(function() {
    var searchForm = $(".search-form");
    var url = searchForm.attr('data-url');
    if (!searchForm.length || !url) {
        return;
    }

    searchForm.find("#query").autocomplete({
        serviceUrl: url,
        paramName: 'q',
        type: "GET",
        onSelect: function(keyword) {
            window.location.href = `search-result.html?q=${keyword.value}`;
        },
        transformResult: function(response) {
            console.log(response);
            response = JSON.parse(response);
            return {
                suggestions: response
            }
        },
        minChars: 2,
        showNoSuggestionNotice: true
    });

    $(".search-form").on("submit", function(a) {
        a.preventDefault();
        var query = $(this).find('#query').val().trim()
        if (query) {
            window.location.href = `search-result.html?q=${query}`;
        }
        return false;
    })
});


/**
 * Wifi PIN
 */
const inputs = document.querySelectorAll(".input-pin-control .pin-input");
const codeBlock = document.getElementById("code-block");
const code = document.getElementById("code");
const form = document.querySelector("accountForm");

inputs.forEach((input, key) => {
    input.addEventListener("click", function() {
        let inputFocuced = false;
        for (let key = 0; key < inputs.length; key++) {
            let input = inputs[key];
            if (!input.value) {
                inputs[key].focus();
                inputFocuced = true;
                break;
            }
        }
        if (!inputFocuced) {
            inputs[inputs.length - 1].focus();
        }
    });
    input.addEventListener("keydown", function(event) {
        if (event.keyCode == 8) {
            if (!input.value) {
                inputs[key - 1].focus();
            }
        }
    })
    input.addEventListener("keyup", function(event) {
        console.log(event.keyCode);
        if (input.value) {
            if (key === 3) {
                const userCode = [...inputs].map((input) => input.value).join("");
                codeBlock.classList.remove("hidden");
                code.innerText = userCode;
            } else {
                inputs[key + 1].focus();
            }
        }
    });
});

const reset = () => {
    form.reset();
    codeBlock.classList.add("hidden");
    code.innerText = "";
};