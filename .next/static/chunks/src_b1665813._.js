(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["static/chunks/src_b1665813._.js", {

"[project]/src/components/FinalCartItem.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>FinalCartItem)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$minus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Minus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/minus.js [app-client] (ecmascript) <export default as Minus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/plus.js [app-client] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trash-2.js [app-client] (ecmascript) <export default as Trash2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$Cart$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/store/Cart.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
function FinalCartItem({ item, location, currencies, onTotalChange }) {
    _s();
    const [quantity, setQuantity] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(item.en_carrito);
    const [visible, setVisible] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [prevQuantity, setPrevQuantity] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(item.en_carrito);
    const [buttonDisable, setButtonDisabled] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const setAmount = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$Cart$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCart"])({
        "FinalCartItem.useCart[setAmount]": (state)=>state.setAmount
    }["FinalCartItem.useCart[setAmount]"]);
    const { amount } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$Cart$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCart"])();
    const price = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "FinalCartItem.useMemo[price]": ()=>{
            let calculatedPrice = 0;
            if (location === "CU" && item.prices[0][2] === "CUP") {
                calculatedPrice = item.prices[0][1];
            } else if (location !== "CU" && item.prices[0][2] === "USD") {
                calculatedPrice = item.prices[0][1];
            } else if (location === "CU" && item.prices[0][2] === "USD") {
                calculatedPrice = item.prices[0][1] * currencies[1]?.value || 0;
            } else if (location !== "CU" && item.prices[0][2] === "CUP") {
                calculatedPrice = Math.ceil(item.prices[0][1] / currencies[1]?.value * 100) / 100 || 0;
            }
            return calculatedPrice;
        }
    }["FinalCartItem.useMemo[price]"], [
        location,
        currencies,
        item.prices
    ]);
    // Efecto para notificar cambios en el total
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "FinalCartItem.useEffect": ()=>{
            if (onTotalChange) {
                const total = price * quantity;
                onTotalChange(total);
            }
        }
    }["FinalCartItem.useEffect"], [
        quantity
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "FinalCartItem.useEffect": ()=>{
            const updateCart = {
                "FinalCartItem.useEffect.updateCart": async ()=>{
                    try {
                        const body = JSON.stringify({
                            id_user_action: JSON.parse(localStorage.getItem("userData") || "{}").userId || null,
                            id_user: JSON.parse(localStorage.getItem("userData") || "{}").userId || null,
                            id_product: item.id,
                            newCount: quantity
                        });
                        const response = await fetch(`${("TURBOPACK compile-time value", "https://app.fadiar.com/api")}/modificar_cantidad_producto_carrito`, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body
                        });
                        if (!response.ok) {
                            setQuantity(prevQuantity);
                            throw new Error("Error al actualizar el carrito");
                        }
                        console.log(await response.json());
                        setPrevQuantity(quantity);
                    } catch (error) {
                        console.error("Error actualizando el carrito:", error);
                    }
                }
            }["FinalCartItem.useEffect.updateCart"];
            const deleteItem = {
                "FinalCartItem.useEffect.deleteItem": async ()=>{
                    try {
                        const body = JSON.stringify({
                            id_user_action: JSON.parse(localStorage.getItem("userData") || "{}").userId || null,
                            id_user: JSON.parse(localStorage.getItem("userData") || "{}").userId || null,
                            id_product: item.id
                        });
                        const response = await fetch(`${("TURBOPACK compile-time value", "https://app.fadiar.com/api")}/eliminar_producto_carrito`, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body
                        });
                        if (!response.ok) {
                            throw new Error("Error al eliminar el item del carrito");
                        }
                        window.dispatchEvent(new Event("cartDataChanged"));
                    } catch (error) {
                        console.error("Error eliminando el item del carrito:", error);
                    }
                }
            }["FinalCartItem.useEffect.deleteItem"];
            quantity > 0 ? updateCart() : deleteItem();
        }
    }["FinalCartItem.useEffect"], [
        quantity
    ]);
    function handleSetQuantity(q) {
        if (q == quantity - 1) {
            setAmount(amount - 1);
        } else if (q == quantity + 1) {
            setAmount(amount + 1);
        }
        setQuantity(q);
        if (q <= 0) setVisible(false);
        setButtonDisabled(true);
        setTimeout(()=>{
            setButtonDisabled(false);
        }, 3000); // Habilitar nuevamente después de 3 segundos
    }
    // Función para eliminar directamente el producto del carrito
    const handleDeleteItem = async ()=>{
        try {
            setButtonDisabled(true);
            const body = JSON.stringify({
                id_user_action: JSON.parse(localStorage.getItem("userData") || "{}").userId || null,
                id_user: JSON.parse(localStorage.getItem("userData") || "{}").userId || null,
                id_product: item.id
            });
            const response = await fetch(`${("TURBOPACK compile-time value", "https://app.fadiar.com/api")}/eliminar_producto_carrito`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body
            });
            if (!response.ok) {
                throw new Error("Error al eliminar el producto del carrito");
            }
            // Actualizar el total a pagar
            if (onTotalChange) {
                onTotalChange(0); // El producto se eliminó, su contribución al total es 0
            }
            // Actualizar la cantidad en el store
            setAmount(amount - quantity);
            // Ocultar el componente
            setVisible(false);
            // Disparar evento para actualizar el carrito
            window.dispatchEvent(new Event("cartDataChanged"));
            console.log("Producto eliminado exitosamente");
        } catch (error) {
            console.error("Error eliminando el producto del carrito:", error);
        } finally{
            setButtonDisabled(false);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: visible && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex w-full h-28 bg-white",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex-shrink-0 h-full aspect-square overflow-hidden p-1",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        src: `${("TURBOPACK compile-time value", "https://app.fadiar.com/api")}/${item.img}`,
                        alt: item.name,
                        width: 200,
                        height: 200,
                        className: "w-full h-full object-cover"
                    }, void 0, false, {
                        fileName: "[project]/src/components/FinalCartItem.tsx",
                        lineNumber: 186,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/FinalCartItem.tsx",
                    lineNumber: 185,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col w-full max-w-full text-sm p-2 text-[#9f9f9f]",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "flex w-full font-semibold",
                            children: item.name
                        }, void 0, false, {
                            fileName: "[project]/src/components/FinalCartItem.tsx",
                            lineNumber: 195,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "flex w-full text-sm",
                            children: [
                                "Marca ",
                                item.brand
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/FinalCartItem.tsx",
                            lineNumber: 196,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-1",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "flex font-bold mt-auto text-[#022953]",
                                    children: [
                                        location === "CU" && item.prices[0][2] === "CUP" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                            children: [
                                                item.prices[0][1],
                                                " CUP"
                                            ]
                                        }, void 0, true),
                                        location !== "CU" && item.prices[0][2] === "USD" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                            children: [
                                                item.prices[0][1],
                                                " USD"
                                            ]
                                        }, void 0, true),
                                        location === "CU" && item.prices[0][2] === "USD" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                            children: [
                                                item.prices[0][1] * currencies[1].value,
                                                " CUP"
                                            ]
                                        }, void 0, true),
                                        location !== "CU" && item.prices[0][2] === "CUP" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                            children: [
                                                Math.ceil(item.prices[0][1] / currencies[1].value * 100) / 100,
                                                " ",
                                                "USD"
                                            ]
                                        }, void 0, true)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/FinalCartItem.tsx",
                                    lineNumber: 198,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex ml-auto items-end",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-1 mr-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>handleSetQuantity(quantity - 1),
                                                    className: `text-[#022953] rounded-sm transition-all duration-300 ${buttonDisable === false ? "hover:text-white hover:bg-[#022953]" : "cursor-wait"}`,
                                                    disabled: buttonDisable,
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$minus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Minus$3e$__["Minus"], {}, void 0, false, {
                                                        fileName: "[project]/src/components/FinalCartItem.tsx",
                                                        lineNumber: 225,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/FinalCartItem.tsx",
                                                    lineNumber: 220,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "number",
                                                    className: "flex w-16 border-gray-300 border-2 rounded-sm text-[#022953] text-center",
                                                    value: quantity,
                                                    onChange: ()=>handleSetQuantity(quantity),
                                                    disabled: true
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/FinalCartItem.tsx",
                                                    lineNumber: 227,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>handleSetQuantity(quantity + 1),
                                                    className: `text-[#022953] rounded-sm transition-all duration-300 ${buttonDisable === false ? "hover:text-white hover:bg-[#022953]" : "cursor-wait"}`,
                                                    disabled: buttonDisable,
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {}, void 0, false, {
                                                        fileName: "[project]/src/components/FinalCartItem.tsx",
                                                        lineNumber: 239,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/FinalCartItem.tsx",
                                                    lineNumber: 234,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/FinalCartItem.tsx",
                                            lineNumber: 219,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: handleDeleteItem,
                                            className: `text-red-500 hover:text-red-600 rounded-sm transition-all duration-300 p-1 ${buttonDisable === false ? "hover:bg-red-50" : "cursor-wait"}`,
                                            disabled: buttonDisable,
                                            title: "Eliminar producto",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                                size: 14
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/FinalCartItem.tsx",
                                                lineNumber: 248,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/FinalCartItem.tsx",
                                            lineNumber: 242,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/FinalCartItem.tsx",
                                    lineNumber: 218,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/FinalCartItem.tsx",
                            lineNumber: 197,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/FinalCartItem.tsx",
                    lineNumber: 194,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/FinalCartItem.tsx",
            lineNumber: 184,
            columnNumber: 9
        }, this)
    }, void 0, false);
}
_s(FinalCartItem, "3R9giPVtDxPxGvr5I4LeHU2h418=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$Cart$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCart"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$Cart$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCart"]
    ];
});
_c = FinalCartItem;
var _c;
__turbopack_context__.k.register(_c, "FinalCartItem");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/checkout/page.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>CheckoutPage)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$FinalCartItem$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/FinalCartItem.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2d$round$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UserRound$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/user-round.js [app-client] (ecmascript) <export default as UserRound>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$Cart$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/store/Cart.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
const provinciasCuba = {
    "Pinar del Río": [
        "Pinar del Río",
        "Consolación del Sur",
        "Guane",
        "La Palma",
        "Los Palacios",
        "Mantua",
        "Minas de Matahambre",
        "San Juan y Martínez",
        "San Luis",
        "Sandino",
        "Viñales"
    ],
    Artemisa: [
        "Artemisa",
        "Alquízar",
        "Bauta",
        "Caimito",
        "Guanajay",
        "Güira de Melena",
        "Mariel",
        "San Antonio de los Baños",
        "Bahía Honda",
        "Candelaria",
        "San Cristóbal"
    ],
    "La Habana": [
        "Arroyo Naranjo",
        "Boyeros",
        "Centro Habana",
        "Cerro",
        "Cotorro",
        "Diez de Octubre",
        "Guanabacoa",
        "Habana del Este",
        "Habana Vieja",
        "La Lisa",
        "Marianao",
        "Playa",
        "Plaza de la Revolución",
        "Regla",
        "San Miguel del Padrón"
    ],
    Mayabeque: [
        "Batabanó",
        "Bejucal",
        "Güines",
        "Jaruco",
        "Madruga",
        "Melena del Sur",
        "Nueva Paz",
        "Quivicán",
        "San José de las Lajas",
        "Santa Cruz del Norte"
    ],
    Matanzas: [
        "Cárdenas",
        "Ciénaga de Zapata",
        "Colón",
        "Jagüey Grande",
        "Jovellanos",
        "Limonar",
        "Los Arabos",
        "Martí",
        "Matanzas",
        "Pedro Betancourt",
        "Perico",
        "Unión de Reyes"
    ],
    Cienfuegos: [
        "Aguada de Pasajeros",
        "Cienfuegos",
        "Cruces",
        "Cumanayagua",
        "Lajas",
        "Palmira",
        "Rodas"
    ],
    "Villa Clara": [
        "Caibarién",
        "Camajuaní",
        "Cifuentes",
        "Corralillo",
        "Encrucijada",
        "Manicaragua",
        "Placetas",
        "Quemado de Güines",
        "Ranchuelo",
        "Remedios",
        "Sagua la Grande",
        "Santa Clara",
        "Santo Domingo"
    ],
    "Sancti Spíritus": [
        "Cabaiguán",
        "Fomento",
        "Jatibonico",
        "La Sierpe",
        "Sancti Spíritus",
        "Taguasco",
        "Trinidad",
        "Yaguajay"
    ],
    "Ciego de Ávila": [
        "Baraguá",
        "Bolivia",
        "Ciego de Ávila",
        "Chambas",
        "Ciro Redondo",
        "Florencia",
        "Majagua",
        "Morón",
        "Primero de Enero",
        "Venezuela"
    ],
    Camagüey: [
        "Camagüey",
        "Carlos Manuel de Céspedes",
        "Esmeralda",
        "Florida",
        "Guaimaro",
        "Jimaguayú",
        "Minas",
        "Najasa",
        "Nuevitas",
        "Santa Cruz del Sur",
        "Sibanicú",
        "Sierra de Cubitas",
        "Vertientes"
    ],
    "Las Tunas": [
        "Amancio",
        "Colombia",
        "Jesús Menéndez",
        "Jobabo",
        "Las Tunas",
        "Majibacoa",
        "Manatí",
        "Puerto Padre"
    ],
    Holguín: [
        "Antilla",
        "Báguanos",
        "Banes",
        "Cacocum",
        "Calixto García",
        "Cueto",
        "Frank País",
        "Gibara",
        "Holguín",
        "Mayarí",
        "Moa",
        "Rafael Freyre",
        "Sagua de Tánamo",
        "Urbano Noris"
    ],
    Granma: [
        "Bartolomé Masó",
        "Bayamo",
        "Buey Arriba",
        "Campechuela",
        "Cauto Cristo",
        "Guisa",
        "Jiguaní",
        "Manzanillo",
        "Media Luna",
        "Niquero",
        "Pilón",
        "Río Cauto",
        "Yara"
    ],
    "Santiago de Cuba": [
        "Contramaestre",
        "Guamá",
        "Mella",
        "Palma Soriano",
        "San Luis",
        "Santiago de Cuba",
        "Segundo Frente",
        "Songo - La Maya",
        "Tercer Frente"
    ],
    Guantánamo: [
        "Baracoa",
        "Caimanera",
        "El Salvador",
        "Guantánamo",
        "Imías",
        "Maisí",
        "Manuel Tames",
        "Niceto Pérez",
        "San Antonio del Sur",
        "Yateras"
    ],
    "Isla de la Juventud": [
        "Isla de la Juventud"
    ]
};
async function fetchCartItems(userData) {
    if (!userData) {
        console.log("No tengo datos");
        return {};
    }
    try {
        const body = JSON.stringify({
            id_user_action: userData.userId,
            id_user: userData.userId,
            comisiones: false
        });
        const response = await fetch(`${("TURBOPACK compile-time value", "https://app.fadiar.com/api")}/obtener_productos_carrito`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: body
        });
        if (!response.ok) {
            throw new Error("Error al cargar el carrito");
        }
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.log(error);
    }
}
async function getLocation() {
    try {
        const res = await fetch("https://app.fadiar.com/api/get_location", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({})
        });
        const data = await res.json();
        return !data.country || data.country === "Cuba" ? "CU" : "US";
    } catch (error) {
        console.error("Error obteniendo la ubicación:", error);
        return "US";
    }
}
function CheckoutPage() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const setAmount = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$Cart$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCart"])({
        "CheckoutPage.useCart[setAmount]": (state)=>state.setAmount
    }["CheckoutPage.useCart[setAmount]"]);
    // State for cart and UI
    const [cartItems, setCartItems] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null); // null means loading, [] means loaded but empty
    const [currencies, setCurrencies] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]); // Estado para almacenar la moneda actual
    const [location, setLocation] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("US");
    const [itemTotals, setItemTotals] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [delivery, setDelivery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [isExpanded, setIsExpanded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isAnimating, setIsAnimating] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [tried, setTried] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [useMyAddress, setUseMyAddress] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [addresses, setAddresses] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [selectedAddress, setSelectedAddress] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // Form state
    const [formData, setFormData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        provincia: "",
        municipio: "",
        direccionExacta: "",
        phone: "",
        ci_cliente: ""
    });
    // Form validation state
    const [validation, setValidation] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        provincia: false,
        municipio: false,
        direccionExacta: false,
        phone: false,
        ci_cliente: false,
        addressSelected: false
    });
    const [progress, setProgress] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    // Calculate subtotal using itemTotals
    const subtotal = Object.values(itemTotals).reduce((acc, curr)=>acc + curr, 0);
    // Add delivery fee if delivery is selected
    const deliveryFee = delivery === 1 ? 5 : 0;
    const grandTotal = subtotal + deliveryFee;
    // Uncheck delivery if province is changed to something other than Havana
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CheckoutPage.useEffect": ()=>{
            if (formData.provincia !== 'La Habana' && delivery === 1) {
                setDelivery(0);
                setIsExpanded(false);
            }
        }
    }["CheckoutPage.useEffect"], [
        formData.provincia,
        delivery
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CheckoutPage.useEffect": ()=>{
            const fetchAddresses = {
                "CheckoutPage.useEffect.fetchAddresses": async ()=>{
                    try {
                        const storedUserData = localStorage.getItem("userData");
                        if (!storedUserData) {
                            router.push("/login");
                            return;
                        }
                        const userData = JSON.parse(storedUserData);
                        const response = await fetch(`${("TURBOPACK compile-time value", "https://app.fadiar.com/api")}/obtener-direccion-domicilio-cliente`, {
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            method: 'POST',
                            body: JSON.stringify({
                                id_user: userData.userId
                            })
                        });
                        if (!response.ok) {
                            throw new Error('Error al obtener direcciones');
                        }
                        const data = await response.json();
                        console.log(await data.listado);
                        setAddresses(data.listado);
                    } catch (error) {
                        console.error('Error fetching addresses:', error);
                    }
                }
            }["CheckoutPage.useEffect.fetchAddresses"];
            fetchAddresses();
        }
    }["CheckoutPage.useEffect"], []);
    // Update validation and progress
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CheckoutPage.useEffect": ()=>{
            const isUsingSavedAddress = useMyAddress && selectedAddress !== null;
            // Only validate address fields if not using a saved address
            const addressValid = isUsingSavedAddress || formData.provincia.trim() !== "" && formData.municipio.trim() !== "";
            const newValidation = {
                provincia: isUsingSavedAddress ? true : formData.provincia.trim() !== "",
                municipio: isUsingSavedAddress ? true : formData.municipio.trim() !== "",
                phone: /^\+?[0-9\s-]{8,}$/.test(formData.phone),
                ci_cliente: /^\d{11}$/.test(formData.ci_cliente),
                addressSelected: addressValid,
                direccionExacta: delivery === 1 ? formData.direccionExacta.trim() !== "" : true
            };
            setValidation({
                "CheckoutPage.useEffect": (prev)=>({
                        ...prev,
                        ...newValidation
                    })
            }["CheckoutPage.useEffect"]);
            // Calculate progress
            const requiredFields = delivery === 1 ? 5 : 4; // Total fields that could be required (including idCard)
            const validFields = Object.values(newValidation).filter(Boolean).length;
            const calculatedProgress = Math.min(100, validFields / (delivery === 1 ? 5 : 4) * 100);
            setProgress(calculatedProgress);
        }
    }["CheckoutPage.useEffect"], [
        formData,
        delivery
    ]);
    const handleSubmit = async ()=>{
        setTried(true);
        // Check all required fields
        const isFormValid = formData.provincia.trim() !== "" && formData.municipio.trim() !== "" && (delivery === 0 || formData.direccionExacta.trim() !== "") && formData.phone.trim() !== "" && /^\d{11}$/.test(formData.ci_cliente);
        if (!isFormValid) {
            setError("Por favor llene todos los campos obligatorios correctamente");
            return;
        }
        setError("");
        try {
            const userData = ("TURBOPACK compile-time truthy", 1) ? JSON.parse(localStorage.getItem("userData") || "{}") : ("TURBOPACK unreachable", undefined);
            // Get user details from userData
            const name = userData.name || "";
            const apellidos_cliente = `${userData.last1 || ""} ${userData.last2 || ""}`.trim();
            const orderData = {
                ...formData,
                name_cliente: name,
                last_names: apellidos_cliente,
                cellphone_cliente: formData.phone,
                id_user_action: userData.userId,
                id_user: userData.userId,
                gestor_id: userData.userId,
                delivery,
                total: grandTotal,
                location,
                items: cartItems?.map((item)=>({
                        id_product: item.id,
                        count: item.count,
                        price: item.prices[0][1],
                        currency: item.prices[0][2]
                    }))
            };
            console.log(orderData);
            const response = await fetch(`${("TURBOPACK compile-time value", "https://app.fadiar.com/api")}/add_order`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(orderData)
            });
            const data = await response.json();
            console.log('API Response:', data); // Log the full response
            if (!response.ok) {
                setError(data.message || "Error al comprar");
                return; // Exit early if there's an error
            }
            if (!data || !data.order || !data.order.date) {
                console.error('Unexpected API response structure:', data);
                setError("Formato de respuesta inesperado del servidor");
                return;
            }
            setAmount(0);
            const orderParams = new URLSearchParams({
                date: data.order.date,
                ...formData.direccionExacta && {
                    direccionExacta: `${formData.direccionExacta}, ${formData.municipio}, ${formData.provincia}`
                },
                price: grandTotal.toFixed(2),
                currency: "USD"
            }).toString();
            router.push(`/checkout/ticket?${orderParams}`);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Error desconocido");
        }
    };
    const handleTotalChange = (itemId, total)=>{
        setItemTotals((prev)=>({
                ...prev,
                [itemId]: total
            }));
    };
    //console.log(currencies);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CheckoutPage.useEffect": ()=>{
            const fetchCart = {
                "CheckoutPage.useEffect.fetchCart": async ()=>{
                    try {
                        const user = ("TURBOPACK compile-time truthy", 1) ? await JSON.parse(localStorage.getItem("userData")) : ("TURBOPACK unreachable", undefined);
                        const cartItems = await fetchCartItems(user);
                        const location = await getLocation();
                        setCartItems(user ? cartItems.carrito : {});
                        setCurrencies(user ? cartItems.monedas[0].currencys : {});
                        setLocation("US");
                    } catch (error) {
                        console.error(error);
                    }
                }
            }["CheckoutPage.useEffect.fetchCart"];
            fetchCart();
        }
    }["CheckoutPage.useEffect"], []);
    if (cartItems === null) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-screen flex items-center justify-center bg-white",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-12 h-12 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"
                    }, void 0, false, {
                        fileName: "[project]/src/app/checkout/page.tsx",
                        lineNumber: 501,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-gray-600 font-medium",
                        children: "Cargando tu carrito..."
                    }, void 0, false, {
                        fileName: "[project]/src/app/checkout/page.tsx",
                        lineNumber: 502,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/checkout/page.tsx",
                lineNumber: 500,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/checkout/page.tsx",
            lineNumber: 499,
            columnNumber: 7
        }, this);
    }
    if (cartItems.length === 0) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col items-center justify-center min-h-[calc(100vh-88px)] p-4 bg-white",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center max-w-md p-8 bg-[#f4f4f4] rounded-lg shadow-lg",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-2xl font-bold text-[#022953] mb-4",
                        children: "Tu carrito está vacío"
                    }, void 0, false, {
                        fileName: "[project]/src/app/checkout/page.tsx",
                        lineNumber: 512,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-gray-600 mb-6",
                        children: "Aún no has agregado productos a tu carrito. Comienza a explorar nuestros productos y encuentra lo que necesitas."
                    }, void 0, false, {
                        fileName: "[project]/src/app/checkout/page.tsx",
                        lineNumber: 513,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>router.push('/products'),
                        className: "w-full bg-[#022953] text-white font-bold py-3 px-6 rounded hover:bg-opacity-90 transition-colors",
                        children: "Ver productos"
                    }, void 0, false, {
                        fileName: "[project]/src/app/checkout/page.tsx",
                        lineNumber: 514,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/checkout/page.tsx",
                lineNumber: 511,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/checkout/page.tsx",
            lineNumber: 510,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex h-full w-full min-h-[calc(100vh-88px)] justify-center p-4 bg-white",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col bg-[#f4f4f4] w-120 md:w-1/2 sm:w-2/3 rounded-lg shadow-lg sm:p-10 p-4 gap-4 sm:gap-6",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-full",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "flex font-bold text-xl sm:text-3xl text-[#022953] w-full sm:justify-start justify-center mb-6",
                        children: "Resumen del carrito"
                    }, void 0, false, {
                        fileName: "[project]/src/app/checkout/page.tsx",
                        lineNumber: 529,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/checkout/page.tsx",
                    lineNumber: 528,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col gap-4 sm:gap-6",
                    children: cartItems.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$FinalCartItem$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            location: location,
                            item: item,
                            currencies: currencies,
                            onTotalChange: (total)=>handleTotalChange(item.id, total)
                        }, item.id, false, {
                            fileName: "[project]/src/app/checkout/page.tsx",
                            lineNumber: 535,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/src/app/checkout/page.tsx",
                    lineNumber: 533,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col w-full gap-2 mt-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex w-full items-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "flex text-[#9a9a9a]",
                                    children: "Subtotal"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/checkout/page.tsx",
                                    lineNumber: 546,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "flex ml-auto text-[#022953] text-lg",
                                    children: [
                                        subtotal.toFixed(2),
                                        " ",
                                        location === "CU" ? "CUP" : "USD"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/checkout/page.tsx",
                                    lineNumber: 547,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/checkout/page.tsx",
                            lineNumber: 545,
                            columnNumber: 11
                        }, this),
                        delivery === 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex w-full items-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-col",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-[#9a9a9a]",
                                            children: "Entrega a domicilio"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/checkout/page.tsx",
                                            lineNumber: 554,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-xs text-gray-500",
                                            children: "*El precio puede variar según la distancia. Nos pondremos en contacto con usted."
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/checkout/page.tsx",
                                            lineNumber: 555,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/checkout/page.tsx",
                                    lineNumber: 553,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "flex ml-auto text-[#022953] text-lg",
                                    children: [
                                        "+",
                                        deliveryFee.toFixed(2),
                                        " ",
                                        location === "CU" ? "CUP" : "USD"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/checkout/page.tsx",
                                    lineNumber: 557,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/checkout/page.tsx",
                            lineNumber: 552,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex w-full items-center pt-2 border-t border-gray-200 mt-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "flex text-[#9a9a9a] font-bold",
                                    children: "Total a pagar"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/checkout/page.tsx",
                                    lineNumber: 563,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "flex ml-auto text-[#022953] text-2xl font-bold",
                                    children: [
                                        grandTotal.toFixed(2),
                                        " ",
                                        location === "CU" ? "CUP" : "USD"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/checkout/page.tsx",
                                    lineNumber: 564,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/checkout/page.tsx",
                            lineNumber: 562,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/checkout/page.tsx",
                    lineNumber: 544,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("hr", {
                    className: "flex h-px border-[#9a9a9a] w-full"
                }, void 0, false, {
                    fileName: "[project]/src/app/checkout/page.tsx",
                    lineNumber: 569,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col gap-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "flex text-[#9a9a9a]",
                                    children: "Tú"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/checkout/page.tsx",
                                    lineNumber: 572,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex rounded-full bg-[#9a9a9a] w-12 h-12 items-center justify-center text-white p-1",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2d$round$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UserRound$3e$__["UserRound"], {
                                                className: "flex w-full h-full"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/checkout/page.tsx",
                                                lineNumber: 575,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/checkout/page.tsx",
                                            lineNumber: 574,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "flex text-[#9a9a9a]",
                                            children: ("TURBOPACK compile-time truthy", 1) ? `${JSON.parse(localStorage.getItem("userData") || "{}").name || ""} ${JSON.parse(localStorage.getItem("userData") || "{}").last1 || ""} ${JSON.parse(localStorage.getItem("userData") || "{}").last2 || ""}` : ("TURBOPACK unreachable", undefined)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/checkout/page.tsx",
                                            lineNumber: 577,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/checkout/page.tsx",
                                    lineNumber: 573,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/checkout/page.tsx",
                            lineNumber: 571,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "text-[#9a9a9a]",
                                    children: "Número de teléfono del receptor"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/checkout/page.tsx",
                                    lineNumber: 587,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "relative",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "tel",
                                            value: formData.phone,
                                            onChange: (e)=>{
                                                const value = e.target.value.replace(/[^0-9+\s-]/g, '');
                                                setFormData({
                                                    ...formData,
                                                    phone: value
                                                });
                                            },
                                            placeholder: "Ej: 55555555 o +53 55555555",
                                            className: `w-full p-2 rounded-md border ${tried && !validation.phone && formData.phone ? 'border-red-500' : 'border-gray-300'} ${formData.phone ? validation.phone ? 'border-green-500' : 'border-red-500' : ''}`,
                                            required: true
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/checkout/page.tsx",
                                            lineNumber: 591,
                                            columnNumber: 15
                                        }, this),
                                        formData.phone && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "absolute right-3 top-1/2 transform -translate-y-1/2",
                                            children: validation.phone ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                                className: "h-5 w-5 text-green-500"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/checkout/page.tsx",
                                                lineNumber: 608,
                                                columnNumber: 21
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                                className: "h-5 w-5 text-red-500"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/checkout/page.tsx",
                                                lineNumber: 610,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/checkout/page.tsx",
                                            lineNumber: 606,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/checkout/page.tsx",
                                    lineNumber: 590,
                                    columnNumber: 13
                                }, this),
                                tried && !validation.phone && formData.phone && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-red-500 text-sm",
                                    children: "Por favor ingrese un número de teléfono válido"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/checkout/page.tsx",
                                    lineNumber: 616,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/checkout/page.tsx",
                            lineNumber: 586,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/checkout/page.tsx",
                    lineNumber: 570,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col gap-4",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "text-[#9a9a9a]",
                                children: "Carnet de identidad del receptor"
                            }, void 0, false, {
                                fileName: "[project]/src/app/checkout/page.tsx",
                                lineNumber: 624,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        value: formData.ci_cliente || '',
                                        onChange: (e)=>{
                                            const value = e.target.value.replace(/[^0-9A-Za-z]/g, '').toUpperCase();
                                            setFormData({
                                                ...formData,
                                                ci_cliente: value
                                            });
                                        },
                                        placeholder: "Ej: 12345678901",
                                        className: `w-full p-2 rounded-md border ${tried && !validation.ci_cliente && formData.ci_cliente ? 'border-red-500' : 'border-gray-300'} ${formData.ci_cliente ? validation.ci_cliente ? 'border-green-500' : 'border-red-500' : ''}`,
                                        required: true
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/checkout/page.tsx",
                                        lineNumber: 626,
                                        columnNumber: 15
                                    }, this),
                                    formData.ci_cliente && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute right-3 top-1/2 transform -translate-y-1/2",
                                        children: validation.ci_cliente ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                            className: "h-5 w-5 text-green-500"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/checkout/page.tsx",
                                            lineNumber: 644,
                                            columnNumber: 21
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                            className: "h-5 w-5 text-red-500"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/checkout/page.tsx",
                                            lineNumber: 646,
                                            columnNumber: 21
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/checkout/page.tsx",
                                        lineNumber: 642,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/checkout/page.tsx",
                                lineNumber: 625,
                                columnNumber: 13
                            }, this),
                            tried && !validation.ci_cliente && formData.ci_cliente && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-red-500 text-sm",
                                children: "Por favor ingrese un carnet de identidad válido"
                            }, void 0, false, {
                                fileName: "[project]/src/app/checkout/page.tsx",
                                lineNumber: 652,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/checkout/page.tsx",
                        lineNumber: 623,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/checkout/page.tsx",
                    lineNumber: 622,
                    columnNumber: 9
                }, this),
                addresses.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col gap-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "checkbox",
                                    id: "useSavedAddress",
                                    checked: useMyAddress,
                                    onChange: ()=>setUseMyAddress(!useMyAddress),
                                    className: "h-4 w-4 rounded border-gray-300 text-[#022953] focus:ring-[#022953]"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/checkout/page.tsx",
                                    lineNumber: 661,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    htmlFor: "useSavedAddress",
                                    className: "text-[#9a9a9a] cursor-pointer",
                                    children: "Usar una dirección guardada"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/checkout/page.tsx",
                                    lineNumber: 668,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/checkout/page.tsx",
                            lineNumber: 660,
                            columnNumber: 13
                        }, this),
                        useMyAddress && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "text-[#9a9a9a]",
                                    children: "Selecciona una dirección:"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/checkout/page.tsx",
                                    lineNumber: 675,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid gap-2",
                                    children: addresses.map((address)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: `p-3 border rounded-md cursor-pointer transition-colors ${selectedAddress === address.id ? 'border-[#022953] bg-blue-50' : 'border-gray-300 hover:border-gray-400'}`,
                                            onClick: ()=>{
                                                setSelectedAddress(address.id);
                                                setFormData((prev)=>({
                                                        ...prev,
                                                        provincia: address.provincia,
                                                        municipio: address.municipio,
                                                        direccionExacta: address.direccion || ''
                                                    }));
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "font-medium",
                                                    children: address.direccion
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/checkout/page.tsx",
                                                    lineNumber: 695,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-sm",
                                                    children: [
                                                        address.municipio,
                                                        ", ",
                                                        address.provincia
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/checkout/page.tsx",
                                                    lineNumber: 696,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, address.id, true, {
                                            fileName: "[project]/src/app/checkout/page.tsx",
                                            lineNumber: 678,
                                            columnNumber: 21
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/src/app/checkout/page.tsx",
                                    lineNumber: 676,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/checkout/page.tsx",
                            lineNumber: 674,
                            columnNumber: 15
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/checkout/page.tsx",
                    lineNumber: 659,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: `flex flex-col gap-4 w-full ${useMyAddress && addresses.length > 0 ? 'hidden' : ''}`,
                    children: [
                        addresses.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm text-gray-600",
                            children: "O ingresa una dirección manualmente:"
                        }, void 0, false, {
                            fileName: "[project]/src/app/checkout/page.tsx",
                            lineNumber: 707,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "text-[#9a9a9a]",
                                    children: "Provincia"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/checkout/page.tsx",
                                    lineNumber: 710,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "relative",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                            value: formData.provincia,
                                            onChange: (e)=>setFormData({
                                                    ...formData,
                                                    provincia: e.target.value,
                                                    municipio: ""
                                                }),
                                            className: `w-full p-2 rounded-md border ${formData.provincia ? 'border-green-500' : 'border-gray-300'}`,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "",
                                                    children: "Seleccione una provincia"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/checkout/page.tsx",
                                                    lineNumber: 724,
                                                    columnNumber: 17
                                                }, this),
                                                Object.keys(provinciasCuba).map((provincia)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: provincia,
                                                        children: provincia
                                                    }, provincia, false, {
                                                        fileName: "[project]/src/app/checkout/page.tsx",
                                                        lineNumber: 726,
                                                        columnNumber: 19
                                                    }, this))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/checkout/page.tsx",
                                            lineNumber: 712,
                                            columnNumber: 15
                                        }, this),
                                        formData.provincia && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "absolute right-3 top-1/2 transform -translate-y-1/2",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                                className: "h-5 w-5 text-green-500"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/checkout/page.tsx",
                                                lineNumber: 733,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/checkout/page.tsx",
                                            lineNumber: 732,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/checkout/page.tsx",
                                    lineNumber: 711,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/checkout/page.tsx",
                            lineNumber: 709,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "text-[#9a9a9a]",
                                    children: "Municipio"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/checkout/page.tsx",
                                    lineNumber: 740,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "relative",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                            value: formData.municipio,
                                            onChange: (e)=>setFormData({
                                                    ...formData,
                                                    municipio: e.target.value
                                                }),
                                            className: `w-full p-2 rounded-md border ${formData.municipio ? 'border-green-500' : 'border-gray-300'}`,
                                            disabled: !formData.provincia,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "",
                                                    children: "Seleccione un municipio"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/checkout/page.tsx",
                                                    lineNumber: 751,
                                                    columnNumber: 17
                                                }, this),
                                                formData.provincia && provinciasCuba[formData.provincia].map((municipio)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: municipio,
                                                        children: municipio
                                                    }, municipio, false, {
                                                        fileName: "[project]/src/app/checkout/page.tsx",
                                                        lineNumber: 756,
                                                        columnNumber: 21
                                                    }, this))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/checkout/page.tsx",
                                            lineNumber: 742,
                                            columnNumber: 15
                                        }, this),
                                        formData.municipio && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "absolute right-3 top-1/2 transform -translate-y-1/2",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                                className: "h-5 w-5 text-green-500"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/checkout/page.tsx",
                                                lineNumber: 763,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/checkout/page.tsx",
                                            lineNumber: 762,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/checkout/page.tsx",
                                    lineNumber: 741,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/checkout/page.tsx",
                            lineNumber: 739,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/checkout/page.tsx",
                    lineNumber: 705,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col gap-2 mt-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                            className: `flex items-center justify-between ${formData.provincia === 'La Habana' ? 'text-[#9a9a9a]' : 'text-gray-400'}`,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "flex items-center",
                                    children: [
                                        "¿Necesitas entrega a domicilio?",
                                        formData.provincia !== 'La Habana' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-xs ml-2",
                                            children: "(Disponible solo en La Habana)"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/checkout/page.tsx",
                                            lineNumber: 778,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/checkout/page.tsx",
                                    lineNumber: 775,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "checkbox",
                                            id: "deliveryCheckbox",
                                            checked: delivery === 1,
                                            disabled: formData.provincia !== 'La Habana',
                                            onChange: (e)=>{
                                                const isChecked = e.target.checked;
                                                setDelivery(isChecked ? 1 : 0);
                                                setIsAnimating(true);
                                                if (isChecked) {
                                                    setIsExpanded(true);
                                                } else {
                                                    setFormData((prev)=>({
                                                            ...prev,
                                                            direccionExacta: ''
                                                        }));
                                                }
                                            },
                                            className: `h-5 w-5 rounded border-gray-300 text-[#022953] focus:ring-[#022953] ${formData.provincia === 'La Habana' ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'}`
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/checkout/page.tsx",
                                            lineNumber: 782,
                                            columnNumber: 15
                                        }, this),
                                        delivery === 1 && formData.provincia === 'La Habana' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-sm text-gray-600 whitespace-nowrap",
                                            children: [
                                                "+$",
                                                deliveryFee.toFixed(2),
                                                " ",
                                                location === "CU" ? "CUP" : "USD"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/checkout/page.tsx",
                                            lineNumber: 804,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/checkout/page.tsx",
                                    lineNumber: 781,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/checkout/page.tsx",
                            lineNumber: 772,
                            columnNumber: 11
                        }, this),
                        delivery === 1 && formData.provincia === 'La Habana' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-xs text-gray-500 mt-1",
                            children: "*El precio puede variar según la ubicación exacta. Nos pondremos en contacto contigo para confirmar el costo final."
                        }, void 0, false, {
                            fileName: "[project]/src/app/checkout/page.tsx",
                            lineNumber: 812,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/checkout/page.tsx",
                    lineNumber: 771,
                    columnNumber: 9
                }, this),
                (!useMyAddress || selectedAddress === null) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: `overflow-hidden transition-all duration-300 ease-in-out ${delivery === 1 ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`,
                    onTransitionEnd: ()=>{
                        if (delivery === 0) {
                            setIsExpanded(false);
                        }
                        setIsAnimating(false);
                    },
                    style: {
                        visibility: isExpanded || isAnimating ? 'visible' : 'hidden'
                    },
                    children: isExpanded && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col gap-2 w-full pt-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "text-[#9a9a9a]",
                                children: "Dirección exacta"
                            }, void 0, false, {
                                fileName: "[project]/src/app/checkout/page.tsx",
                                lineNumber: 836,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                        value: formData.direccionExacta,
                                        onChange: (e)=>setFormData((prev)=>({
                                                    ...prev,
                                                    direccionExacta: e.target.value
                                                })),
                                        required: delivery === 1,
                                        placeholder: "Escriba su dirección completa aquí (calle, número, entre calles, edificio, apartamento, etc.)",
                                        className: `w-full p-2 min-h-20 bg-white placeholder:text-left text-left align-top rounded-md border focus:ring-2 focus:ring-[#022953] focus:border-transparent transition-all duration-200 ${tried && delivery === 1 && !formData.direccionExacta ? 'border-red-500' : formData.direccionExacta ? 'border-green-500' : 'border-gray-300'}`
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/checkout/page.tsx",
                                        lineNumber: 838,
                                        columnNumber: 19
                                    }, this),
                                    formData.direccionExacta && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute right-3 top-3",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                            className: "h-5 w-5 text-green-500"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/checkout/page.tsx",
                                            lineNumber: 855,
                                            columnNumber: 23
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/checkout/page.tsx",
                                        lineNumber: 854,
                                        columnNumber: 21
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/checkout/page.tsx",
                                lineNumber: 837,
                                columnNumber: 17
                            }, this),
                            tried && delivery === 1 && !formData.direccionExacta && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-red-500 text-sm",
                                children: "Por favor ingrese una dirección de entrega válida"
                            }, void 0, false, {
                                fileName: "[project]/src/app/checkout/page.tsx",
                                lineNumber: 860,
                                columnNumber: 19
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/checkout/page.tsx",
                        lineNumber: 835,
                        columnNumber: 15
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/checkout/page.tsx",
                    lineNumber: 820,
                    columnNumber: 11
                }, this),
                formData.provincia && formData.municipio && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm text-blue-800",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                children: "Ubicación seleccionada:"
                            }, void 0, false, {
                                fileName: "[project]/src/app/checkout/page.tsx",
                                lineNumber: 872,
                                columnNumber: 15
                            }, this),
                            " ",
                            formData.municipio,
                            ", ",
                            formData.provincia,
                            delivery === 1 && formData.direccionExacta && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "block mt-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                        children: "Dirección de entrega:"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/checkout/page.tsx",
                                        lineNumber: 875,
                                        columnNumber: 19
                                    }, this),
                                    " ",
                                    formData.direccionExacta
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/checkout/page.tsx",
                                lineNumber: 874,
                                columnNumber: 17
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/checkout/page.tsx",
                        lineNumber: 871,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/checkout/page.tsx",
                    lineNumber: 870,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-full mt-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "text-lg font-medium text-gray-900 mb-4",
                            children: "Resumen del pedido"
                        }, void 0, false, {
                            fileName: "[project]/src/app/checkout/page.tsx",
                            lineNumber: 883,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-white rounded-lg border border-gray-200 p-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex justify-between mb-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: "Subtotal:"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/checkout/page.tsx",
                                            lineNumber: 886,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: [
                                                "$",
                                                subtotal.toFixed(2),
                                                " ",
                                                location === "CU" ? "CUP" : "USD"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/checkout/page.tsx",
                                            lineNumber: 887,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/checkout/page.tsx",
                                    lineNumber: 885,
                                    columnNumber: 13
                                }, this),
                                delivery === 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex justify-between mb-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: "Envío:"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/checkout/page.tsx",
                                            lineNumber: 891,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: [
                                                "$",
                                                deliveryFee.toFixed(2),
                                                " ",
                                                location === "CU" ? "CUP" : "USD"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/checkout/page.tsx",
                                            lineNumber: 892,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/checkout/page.tsx",
                                    lineNumber: 890,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "border-t border-gray-200 my-3"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/checkout/page.tsx",
                                    lineNumber: 895,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex justify-between font-medium",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: "Total:"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/checkout/page.tsx",
                                            lineNumber: 897,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: [
                                                "$",
                                                (subtotal + (delivery === 1 ? deliveryFee : 0)).toFixed(2),
                                                " ",
                                                location === "CU" ? "CUP" : "USD"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/checkout/page.tsx",
                                            lineNumber: 898,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/checkout/page.tsx",
                                    lineNumber: 896,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/checkout/page.tsx",
                            lineNumber: 884,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/checkout/page.tsx",
                    lineNumber: 882,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "hidden w-full h-full bg-blue-500/10 md:p-10 p-4 items-center justify-center text-center md:text-2xl rounded-md text-blue-900",
                    children: "Lo sentimos, no se pueden hacer pedidos temporalmente"
                }, void 0, false, {
                    fileName: "[project]/src/app/checkout/page.tsx",
                    lineNumber: 918,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex w-full justify-center",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: handleSubmit,
                        className: "flex w-full md:w-1/2 h-12 bg-[#022953] font-bold text-white items-center justify-center hover:text-lg transition-all duration-300 rounded-md",
                        children: "Confirmar orden"
                    }, void 0, false, {
                        fileName: "[project]/src/app/checkout/page.tsx",
                        lineNumber: 923,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/checkout/page.tsx",
                    lineNumber: 922,
                    columnNumber: 9
                }, this),
                tried && error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "w-full bg-red-300 font-xs p-2 items-center text-center text-red-700 rounded-md",
                    children: error
                }, void 0, false, {
                    fileName: "[project]/src/app/checkout/page.tsx",
                    lineNumber: 931,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/checkout/page.tsx",
            lineNumber: 527,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/checkout/page.tsx",
        lineNumber: 526,
        columnNumber: 5
    }, this);
}
_s(CheckoutPage, "l6wIzHL0uFnYftTjmNGu9Q7dxtw=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$Cart$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCart"]
    ];
});
_c = CheckoutPage;
var _c;
__turbopack_context__.k.register(_c, "CheckoutPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=src_b1665813._.js.map