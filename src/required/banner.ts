/**
 * 本模块负责替换顶栏动图接口
 * 本模块动态banner相关代码移植自B站header.js
 */
(function () {
    try {
        class Animate {
            static rid = this.resourceId();
            static locs = [1576, 1612, 1580, 1920, 1584, 1588, 1592, 3129, 1600, 1608, 1604, 1596, 2210, 1634, 142];
            /**
             * 有在启用了动画banner的配置，且浏览器支持css filter时才加载动画banner的图片资源  
             * safari浏览器在mac屏幕上模糊效果有性能问题，不开启
             */
            animatedBannerSupport =
                typeof CSS !== 'undefined' && CSS.supports && CSS.supports('filter: blur(1px)')
                && !/^((?!chrome|android).)*safari/i.test(navigator.userAgent);
            layerConfig: {
                extensions?: {
                    time: any
                },
                layers: {
                    blur: any,
                    id: number,
                    name: string,
                    opacity: { wrap: string, initial?: any, offset?: any, offsetCurve?: any },
                    resources: { id: number, src: string }[],
                    rotate: any,
                    scale: { initial: number, offset?: any, offsetCurve?: any },
                    translate: { offset: number[], initial?: any, offsetCurve?: any },
                    _initState: any;
                }[]
            }
            resources: (HTMLVideoElement | HTMLImageElement)[] = [];
            /**
             * container 元素上有其他元素，需使用全局事件判断鼠标位置
             */
            entered = false;
            extensions: any[] = [];
            handleMouseLeave: (e: any) => void;
            handleMouseMove: (e: any) => void;
            handleResize: (e: any) => void;
            constructor(v: any) {
                if (this.animatedBannerSupport) this.mounted(v);
                API.addCss(API.getModule("animated-banner.css"), "animated-banner");
                if (v.is_split_layer !== 0) {
                    API.addCss(".blur-bg {display:none}");
                } else
                    API.addCss(".blur-bg {background:none !important;-webkit-backdrop-filter: blur(4px);backdrop-filter: blur(4px)}");
            }
            static resourceId() {
                if (location.href.includes("v/douga")) return 1576;
                if (location.href.includes("/anime")) return 1612;
                if (location.href.includes("v/music")) return 1580;
                if (location.href.includes("/guochuang")) return 1920;
                if (location.href.includes("v/dance")) return 1584;
                if (location.href.includes("v/game")) return 1588;
                if (location.href.includes("v/knowledge")) return 1592;
                if (location.href.includes("v/tech")) return 3129;
                if (location.href.includes("v/life")) return 1600;
                if (location.href.includes("v/kichiku")) return 1608;
                if (location.href.includes("v/fashion")) return 1604;
                if (location.href.includes("v/ent")) return 1596;
                if (location.href.includes("v/cinephile")) return 2210;
                if (location.href.includes("/cinema")) return 1634;
                return 142;
            }
            async mounted(v: any) {
                this.layerConfig = JSON.parse(v.split_layer);
                if (!this.layerConfig.layers) return;
                try {
                    if("extensions" in this.layerConfig && "time" in this.layerConfig.extensions) {
                        let time: number, now = (Date.now() - (new Date).setHours(0, 0, 0, 0)) / 1e3;
                        let timeCode = Object.keys(this.layerConfig.extensions.time).sort((a,b) => parseInt(a) - parseInt(b));
                        for(let t of timeCode) {
                            if(parseInt(t) < now) time = parseInt(t);
                            else break;
                        }
                        let timelayers = this.layerConfig.extensions.time[time];
                        this.layerConfig.layers = timelayers[Math.floor(Math.random() * timelayers.length)].layers;
                    }
                    await Promise.all(this.layerConfig.layers.map(async (v, index) => {
                        return Promise.all(v.resources.map(async (i) => {
                            if (/\.(webm|mp4)$/.test(i.src)) {
                                const res = await xhr({ url: i.src, responseType: "blob" });
                                const url = URL.createObjectURL(res);
                                const video = document.createElement('video');
                                video.muted = true;
                                // video.autoplay = true
                                video.loop = true;
                                video.src = url;
                                video.playsInline = true;
                                video.style.objectFit = 'cover'; // 元素尺寸大于视频实际尺寸时放大
                                this.resources[index] = video;

                                // 视频需要添加到dom树才能获取宽高
                                video.width = 0
                                video.height = 0
                                document.body.appendChild(video)
                                await new Promise(resolve => {
                                    const onMetaLoad = () => {
                                        resolve(true)
                                        video.removeEventListener('loadedmetadata', onMetaLoad)
                                    }
                                    video.addEventListener('loadedmetadata', onMetaLoad)
                                })
                            } else {
                                const img = document.createElement('img')
                                img.src = i.src
                                await new Promise(resolve => img.onload = resolve)
                                this.resources[index] = img
                            }
                        }))
                    }))
                } catch (e) {
                    debug.error('load animated banner images error', e)
                    return
                }
                let container: HTMLDivElement = document.querySelector("#banner_link");
                if (!container) {
                    container = document.querySelector(".h-center");
                    if (!container) return;
                    container.parentElement.removeAttribute("style");
                    container.style.width = "100%";
                    container.style.top = "-42px";
                    container.style.marginBottom = "-42px";
                    container.innerHTML = "";
                    document.querySelector(".b-header-mask-wrp").remove();
                };
                container.classList.add("animated-banner");
                let containerHeight = container.clientHeight;
                let containerWidth = container.clientWidth;
                let containerScale = containerHeight / 155;

                // 初始化资源尺寸
                this.layerConfig.layers.forEach(v => {
                    v._initState = {
                        scale: 1,
                        rotate: v.rotate?.initial || 0,
                        translate: v.translate?.initial || [0, 0],
                        blur: v.blur?.initial || 0,
                        opacity: v.opacity?.initial === undefined ? 1 : v.opacity.initial,
                    }
                    v.resources.forEach((i, index) => {
                        const el = this.resources[index]
                        if (el.tagName === 'VIDEO') {
                            if (el.parentNode) {
                                el.parentNode.removeChild(el)
                            }
                            (<HTMLVideoElement>el).dataset.height = <any>(<HTMLVideoElement>el).videoHeight;
                            (<HTMLVideoElement>el).dataset.width = <any>(<HTMLVideoElement>el).videoWidth;
                        } else {
                            el.dataset.height = <any>(<HTMLImageElement>el).naturalHeight;
                            el.dataset.width = <any>(<HTMLImageElement>el).naturalWidth;
                        }
                        const initial = v.scale?.initial === undefined ? 1 : v.scale?.initial
                        el.height = (<any>el.dataset.height) * containerScale * initial
                        el.width = (<any>el.dataset.width) * containerScale * initial
                    })
                })

                // 初始化图层
                const layers = this.layerConfig.layers.map(v => {
                    const layer = document.createElement('div');
                    layer.classList.add('layer');
                    container.appendChild(layer);
                    return layer;
                })

                let displace = 0;
                let enterX = 0;
                let raf = 0;

                const curveParameterToFunc = (param: [number, number, number, number]) => {
                    const o = API.bezier(...param);
                    return v => v > 0 ? o(v) : -o(-v);
                }
                let lastDisplace = NaN;

                // 根据鼠标位置改变状态
                const af = t => {
                    try {
                        if (lastDisplace === displace) {
                            return
                        }
                        lastDisplace = displace;
                        layers.map((layer, i) => {
                            const v = this.layerConfig.layers[i];
                            const a = layer.firstChild;
                            if (!a) {
                                return
                            }

                            const transform = {
                                scale: v._initState.scale,
                                rotate: v._initState.rotate,
                                translate: v._initState.translate,
                            }
                            if (v.scale) {
                                const x = v.scale.offset || 0;
                                const itp = v.scale.offsetCurve ? curveParameterToFunc(v.scale.offsetCurve) : (x => x);
                                const offset = x * itp(displace);
                                transform.scale = v._initState.scale + offset;
                            }
                            if (v.rotate) {
                                const x = v.rotate.offset || 0;
                                const itp = v.rotate.offsetCurve ? curveParameterToFunc(v.rotate.offsetCurve) : (x => x);
                                const offset = x * itp(displace);
                                transform.rotate = v._initState.rotate + offset;
                            }
                            if (v.translate) {
                                const x = v.translate.offset || [0, 0];
                                const itp = v.translate.offsetCurve ? curveParameterToFunc(v.translate.offsetCurve) : (x => x);
                                const offset = x.map(v => itp(displace) * v);
                                const translate = v._initState.translate.map((x, i) => (x + offset[i]) * containerScale * (v.scale?.initial || 1));
                                transform.translate = translate;
                            }
                            (<HTMLElement>a).style.transform = `scale(${transform.scale})` +
                                `translate(${transform.translate[0]}px, ${transform.translate[1]}px)` +
                                `rotate(${transform.rotate}deg)`
                            if (v.blur) {
                                const x = v.blur.offset || 0;
                                const itp = v.blur.offsetCurve ? curveParameterToFunc(v.blur.offsetCurve) : (x => x);
                                const blurOffset = x * itp(displace);

                                let res = 0;
                                if (!v.blur.wrap || v.blur.wrap === 'clamp') {
                                    res = Math.max(0, v._initState.blur + blurOffset)
                                } else if (v.blur.wrap === 'alternate') {
                                    res = Math.abs(v._initState.blur + blurOffset)
                                }
                                (<HTMLElement>a).style.filter = res < 1e-4 ? '' : `blur(${res}px)`;
                            }

                            if (v.opacity) {
                                const x = v.opacity.offset || 0;
                                const itp = v.opacity.offsetCurve ? curveParameterToFunc(v.opacity.offsetCurve) : (x => x);
                                const opacityOffset = x * itp(displace);

                                const initial = v._initState.opacity;
                                if (!v.opacity.wrap || v.opacity.wrap === 'clamp') {
                                    (<HTMLElement>a).style.opacity = <any>Math.max(0, Math.min(1, initial + opacityOffset))
                                } else if (v.opacity.wrap === 'alternate') {
                                    const x = initial + opacityOffset;
                                    let y = Math.abs(x % 1);
                                    if (Math.abs(x % 2) >= 1) {
                                        y = 1 - y
                                    }
                                    (<HTMLElement>a).style.opacity = <any>y;
                                }
                            }
                        })
                    } catch (e) {
                        debug.error(e)
                    }
                }

                // 初始化图层内图片和帧动画
                this.layerConfig.layers.map((v, i) => {
                    const a = this.resources[i];
                    layers[i].appendChild(a);
                    if (a.tagName === 'VIDEO') {
                        (<HTMLVideoElement>a).play();
                    }
                    requestAnimationFrame(af);
                })

                const handleLeave = () => {
                    const now = performance.now();
                    const timeout = 200;
                    const tempDisplace = displace;
                    cancelAnimationFrame(raf);
                    const leaveAF = t => {
                        if (t - now < timeout) {
                            displace = tempDisplace * (1 - (t - now) / 200);
                            af(t);
                            requestAnimationFrame(leaveAF);
                        } else {
                            displace = 0;
                            af(t);
                        }
                    }
                    raf = requestAnimationFrame(leaveAF);
                }

                this.handleMouseLeave = e => {
                    this.entered = false;
                    handleLeave();
                }
                this.handleMouseMove = e => {
                    const offsetY = document.documentElement.scrollTop + e.clientY;
                    if (offsetY < containerHeight) {
                        if (!this.entered) {
                            this.entered = true;
                            enterX = e.clientX;
                        }
                        displace = (e.clientX - enterX) / containerWidth;
                        cancelAnimationFrame(raf);
                        raf = requestAnimationFrame(af)
                    } else {
                        if (this.entered) {
                            this.entered = false;
                            handleLeave();
                        }
                    }

                    this.extensions.map(v => v.handleMouseMove?.({ e, displace }))
                }
                this.handleResize = e => {
                    containerHeight = container.clientHeight;
                    containerWidth = container.clientWidth;
                    containerScale = containerHeight / 155;
                    this.layerConfig.layers.forEach(lc => {
                        lc.resources.forEach((d, i) => {
                            const el: any = this.resources[i];
                            el.height = el.dataset.height * containerScale * (lc.scale?.initial || 1);
                            el.width = el.dataset.width * containerScale * (lc.scale?.initial || 1);
                        })
                    })
                    cancelAnimationFrame(raf);
                    raf = requestAnimationFrame(t => {
                        af(t)
                    })
                    this.extensions.map(v => v.handleResize?.(e));
                }
                document.addEventListener('mouseleave', this.handleMouseLeave);
                window.addEventListener('mousemove', this.handleMouseMove);
                window.addEventListener('resize', this.handleResize);
            }
        }
        config.bannerGif && API.jsonphook(["api.bilibili.com/x/web-interface/index/icon"], function (xhr) {
            const obj = API.urlObj(xhr.url);
            let callback: any = obj.callback;
            let call: any = window[callback];
            if (call) {
                (<any>window)[callback] = function (v: any) {
                    v.data = API.randomArray(JSON.parse(GM.getResourceText("index-icon.json")).fix, 1)[0];
                    return call(v);
                }
            }
        })
        let tag = false; // 防止二度请求
        API.jsonphook(["api.bilibili.com/x/web-show/res/loc"], function (jsonp) {
            const obj = API.urlObj(jsonp.url);
            let callback: any = obj.callback;
            let call: any = window[callback];
            if (call) {
                (<any>window)[callback] = function (v: any) {
                    const data = GM.getValue<any>("banner");
                    v.data && Animate.locs.forEach(d => {
                        v.data[d] && (v.data[d][0].pic = (data && data.pic) || "//i0.hdslb.com/bfs/activity-plat/static/20171220/68a052f664e8414bb594f9b00b176599/images/90w1lpp6ry.png",
                            v.data[d][0].litpic = (data && data.litpic),
                            v.data[d][0].url = (data && data.url) || "",
                            v.data[d][0].title = (data && data.name) || "");
                        if (jsonp.url.includes("loc?") && obj.id == String(d)) {
                            v.data[0].pic = (data && data.pic) || "//i0.hdslb.com/bfs/activity-plat/static/20171220/68a052f664e8414bb594f9b00b176599/images/90w1lpp6ry.png";
                            v.data[0].litpic = (data && data.litpic) || "";
                            v.data[0].url = (data && data.url) || "";
                            v.data[0].title = (data && data.name) || "";
                        }
                    })
                    return call(v);
                }
            }
            if (tag) return;
            tag = true;
            xhr({
                url: `https://api.bilibili.com/x/web-show/page/header?resource_id=${Animate.rid}`,
                responseType: "json",
                credentials: true
            }).then((d: any) => {
                GM.setValue("banner", d.data);
                new Animate(d.data);
            })
        })
    } catch (e) { toast.error("banner.js", e) }
})();