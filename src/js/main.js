//= ../../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js
//= ../../node_modules/jquery/dist/jquery.slim.min.js
//= ../../node_modules/bootstrap-select/dist/js/bootstrap-select.min.js
//= ../../node_modules/owl.carousel/dist/owl.carousel.min.js
//= ../../node_modules/cloudinary-video-player/dist/cld-video-player.min.js


$(function() {
    initSelectPicker();
    initFormValidation();
    addScrolledClassToNavbarOnScroll();
    initInputPinControl(".input-pin-control");
    carouselsSetup(document.documentElement.getAttribute("dir") == 'rtl');
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
        form.addEventListener('submit', event => genericFormsValidation(event, form));
    })
}

function validateFormWithDismissibleAlerts(event, form) {
    event.preventDefault()
    event.stopPropagation()

    if (form.checkValidity()) {
        // TODO: send request to server

        // cleanup the data
        form.reset();
        form.classList.remove('was-validated');

        const confirmationModal = new bootstrap.Modal(document.getElementById('requestAcceptedModal'));
        if (confirmationModal) {
            confirmationModal.show();
        }
    } else {
        form.classList.add('was-validated');
    }
}


function genericFormsValidation(event, form) {
    if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
    }

    form.classList.add('was-validated')
}


function initInputPinControl(selector) {
    const inputPinControls = document.querySelectorAll(selector);
    inputPinControls.forEach(pinControl => {
        const inputs = pinControl.querySelectorAll('.pin-input');
        let focusedIndex = -1;

        inputs.forEach((input, key) => {
            input.addEventListener("paste", (event) => {
                event.preventDefault();
            });

            input.addEventListener("click", function() {
                let inputFocused = false;
                for (let key = 0; key < inputs.length; key++) {
                    let input = inputs[key];
                    if (!input.value) {
                        inputs[key].focus();
                        focusedIndex = key;
                        inputFocused = true;
                        break;
                    }
                }
                if (!inputFocused) {
                    inputs[inputs.length - 1].focus();
                    focusedIndex = inputs.length - 1;
                }
            });
            input.addEventListener("keydown", function(event) {
                if (event.keyCode == 8) {
                    if (!input.value && key > 0) {
                        inputs[key - 1].focus();
                        focusedIndex = key - 1;
                    }
                }
            })
            input.addEventListener("keyup", function() {
                if (input.value) {
                    if (key + 1 < inputs.length) {
                        inputs[key + 1].focus();
                        focusedIndex = key + 1;
                    }
                }
            });
        });

        pinControl.addEventListener("paste", (event) => {
            let paste = (event.clipboardData || window.clipboardData).getData("text");
            if (paste.length == 0) return;

            if (focusedIndex == -1) {
                focusedIndex = 0;
            }

            let i = focusedIndex;
            while(i < inputs.length && i < paste.length) {
                inputs[i].value = paste[i];
                i++;
            }

            if  (i < inputs.length) {
                inputs[i].focus();
            } else {
                inputs[inputs.length - 1].focus();
            }
        });
    })
}


function carouselsSetup(userRtl) {
    const rtl = !!userRtl;
    console.log(rtl)
    /**
     * carousel setup
     */
    $(function() {
        if ($('.video .owl-carousel').length > 0) {
            $('.video .owl-carousel').owlCarousel({
                loop: true,
                rtl: rtl,
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
                        items: 4,
                        stagePadding: 10
                    },
                    768: {
                        items: 4,
                        stagePadding: 10
                    },
                    1200: {
                        items: 5,
                        stagePadding: 46
                    },
                    1400: {
                        items: 6,
                        stagePadding: 10
                    }
                }
            })
        }
    });

    $(function() {
        if ($('.video-detail .owl-carousel').length > 0) {
            $('.video-detail .owl-carousel').owlCarousel({
                loop: true,
                rtl: rtl,
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
                rtl: rtl,
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
                rtl: rtl,

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
}

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
