angular.module('waterScroll', [])
    .directive('waterScroll', ['$timeout', function($timeout) {
        return {
            scope: {
                scrollDistance: "@",
                scrollLoad: "&",
                scrollContainer: '@',
                loadingInfo: "@",
                loadDisabled: "=",
            },
            link: function(scope, ele, attrs, ctrls) {
                var scropllTop, isDisabled, bodyClientHeight, bodyOffsetHeight, scrollLoading,
                    bodyContainer = document.getElementById(scope.scrollContainer) || document.body,
                    scrollDistance = parseInt(scope.scrollDistance || 0),
                    loadingInfo = scope.loadingInfo || "Loadding";
                var isLoading = false;
                var checkHolder = function() {
                    bodyOffsetHeight = bodyContainer.offsetHeight;
                    if (bodyOffsetHeight < ele[0].offsetHeight) {
                        toLoading();
                    }
                }

                var toLoading = function() {
                    if (!scope.loadDisabled && !isDisabled) {
                        if (!isLoading) {
                            isLoading = true;
                            $timeout(function() {
                                scope.scrollLoad();
                            })
                        } else if (isLoading) {
                            scrollLoading = angular.element(document.querySelector('#scrollLoading'))
                            if (scrollLoading && scrollLoading.hasClass('ng-hide')) {
                                scrollLoading.removeClass('ng-hide');
                            }
                        }
                    }
                }
                ele.append("<h1 id='scrollLoading' class='text-center'>" + loadingInfo + "</h1>")

                //检查内容是否渲染全屏
                checkHolder();
                ele.on('scroll', function(e) {
                    scropllTop = ele[0].scrollTop;
                    bodyClientHeight = ele[0].clientHeight;
                    bodyOffsetHeight = bodyContainer.offsetHeight;
                    if (scropllTop + scrollDistance >= bodyOffsetHeight - bodyClientHeight) {
                        toLoading();
                    }
                })

                //每次加载完检查是否渲染全屏
                scope.$on('scrollLoadingFinfish', function() {
                    isLoading = false;
                    isDisabled = false;
                    // angular.element(scrollLoading).addClass('ng-hide')
                    checkHolder();
                })

                scope.$on('stopLoading', function() {
                    scrollLoading = document.querySelector('#scrollLoading')
                    angular.element(scrollLoading).addClass('ng-hide')
                    isDisabled = true;
                })
                scope.$on('startLoading', function() {
                    isLoading = false;
                    isDisabled = false;
                    scrollLoading = angular.element(document.querySelector('#scrollLoading'))
                    if (scrollLoading && scrollLoading.hasClass('ng-hide')) {
                        scrollLoading.removeClass('ng-hide');
                    }
                    toLoading();
                })
            }
        }
    }])