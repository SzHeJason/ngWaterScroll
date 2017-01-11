angular.module('waterScroll', [])
    .directive('waterScroll', ['$rootScope', function ($rootScope) {
        return {
            scope: {
                scrollDistance: "@",
                scrollLoad: "&",
                scrollContainer: '@',
                loadingInfo: "@",
                loadDisabled: "=",
            },
            link: function (scope, ele, attrs, ctrls) {
                var iScope = scope.$new(true);
                var scropllTop, isDisabled, bodyClientHeight, bodyOffsetHeight, scrollLoading,
                    bodyContainer = document.getElementById(scope.scrollContainer),
                    scrollDistance = parseInt(scope.scrollDistance);
                var isLoading = false;
                var checkHolder = function () {
                    bodyOffsetHeight = bodyContainer.offsetHeight;
                    if (bodyOffsetHeight < ele[0].offsetHeight) {
                        toLoading();
                    }
                }

                var toLoading = function () {
                    if (!scope.loadDisabled && !isDisabled) {
                        if (!isLoading) {
                            isLoading = true;
                            scope.scrollLoad();
                        } else if (isLoading) {
                            scrollLoading = document.querySelector('#scrollLoading')
                            if (!scrollLoading) {
                                // console.log("appeding");
                                ele.append("<h1 id='scrollLoading' class='text-center'>" + scope.loadingInfo + "</h1>")
                            }
                        }
                    }
                }

                if (!scope.loadDisabled && !isDisabled) {
                    ele.append("<h1 id='scrollLoading' class='text-center'>" + scope.loadingInfo + "</h1>")
                }

                //检查内容是否渲染全屏
                checkHolder();
                ele.on('scroll', function (e) {
                    scropllTop = ele[0].scrollTop;
                    bodyClientHeight = ele[0].clientHeight;
                    bodyOffsetHeight = bodyContainer.offsetHeight;
                    if (scropllTop + scrollDistance >= bodyOffsetHeight - bodyClientHeight) {
                        toLoading();
                    }
                })

                //每次加载完检查是否渲染全屏
                scope.$on('scrollLoadingFinfish', function () {
                    isLoading = false;
                    isDisabled = false;
                    checkHolder();
                })

                scope.$on('stopLoading', function () {
                    scrollLoading = document.querySelector('#scrollLoading')
                    ngJqLite(scrollLoading).remove();
                    isDisabled = true;
                })
                scope.$on('startLoading', function () {
                    isLoading = false;
                    isDisabled = false;
                    toLoading();
                })
            }
        }
    }])
