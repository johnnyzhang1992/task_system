/**
 * Author johnnyZhang
 * Site johnnyzhang.cn
 * CreateTime 2017/9/12.
 */
require(['config'], function (){
    require(['app','zepto'],function (app,$) {
        app.controller('home_Ctrl', ['$scope', '$rootScope', '$http', function ($scope, $rootScope, $http) {
            $scope.preCount = 2;
            $scope.currentCount = 5;
            $http({
                method: 'GET',
                url: './js/data.json'
            }).then(function successCallback(response) {
                // 请求成功执行代码
                $scope.tasks = response.data.tasks.slice(0,$scope.currentCount);
                $scope.maxCount = response.data.tasks.length;
                console.log( $scope.maxCount);
                $('.ui-loading-block').hide();
            }, function errorCallback(response) {
                // 请求失败执行代码
                require(['sm'],function () {
                    $.alert('Sorry,加载失败了','请重试或者待会再试');
                });
            });
            require(['sm'],function () {
                $.init();
                $('.buttons-tab').fixedTab({offset:44});
                // 无限滚动
                $(function() {
                    $(document).on("pageInit",  function(e, id, page) {
                        var loading = false;
                        var type = null;
                        function addItems(type) {
                            // type 加载的任务类型
                            $http({
                                method: 'GET',
                                url: './js/data.json'
                                // url: './js/data.json？type='+type
                                // 获取不同类型（easy,n）
                            }).then(function successCallback(response) {
                                // 请求成功执行代码
                                $scope.tasks = response.data.tasks.slice(0,$scope.currentCount+$scope.preCount);
                                $scope.currentCount += $scope.preCount;
                                $scope.maxCount = response.data.tasks.length;
                            }, function errorCallback(response) {
                                // 请求失败执行代码
                                $.alert('Sorry,加载失败了','请重试或者待会再试');
                            });
                        }
                        $(page).on('infinite', function() {
                            if (loading) return;
                            var tabIndex = 0;
                            type = $(this).find('.infinite-scroll.active').attr('id');
                            if(type == "easy"){
                                tabIndex = 0;
                            }
                            if(type == "normal"){
                                tabIndex = 1;
                            }
                            if(type == 'hard'){
                                tabIndex = 2;
                            }
                            if ($scope.currentCount >= $scope.maxCount) {
                                $.detachInfiniteScroll($('.infinite-scroll').eq(tabIndex));
                                $('.infinite-scroll-preloader').eq(tabIndex).hide();
                                return;
                            }
                            addItems(type);
                            $.refreshScroller();
                        });
                    });
                    $.init();
                });
                // 下拉刷新
                $(document).on('refresh', '.pull-to-refresh-content',function(e) {
                    $('.pull-to-refresh-layer').show();
                    // type
                    $http({
                        method: 'GET',
                        url: './js/data.json'
                    }).then(function successCallback(response) {
                        // 请求成功执行代码
                        console.log('---refresh ---success');
                        $scope.tasks = response.data.tasks.slice(0,$scope.currentCount);
                        $('.pull-to-refresh-layer').hide();
                    }, function errorCallback(response) {
                        // 请求失败执行代码
                        $.alert('Sorry,加载失败了','请重试或者待会再试');
                    });
                    // 加载完毕需要重置
                    $.pullToRefreshDone('.pull-to-refresh-content');
                });
            });
        }])
    });
});