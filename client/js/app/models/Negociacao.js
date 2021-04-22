"use strict";

System.register([], function (_export, _context) {
    "use strict";

    var _createClass, Negociacao;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [],
        execute: function () {
            _createClass = function () {
                function defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || false;
                        descriptor.configurable = true;
                        if ("value" in descriptor) descriptor.writable = true;
                        Object.defineProperty(target, descriptor.key, descriptor);
                    }
                }

                return function (Constructor, protoProps, staticProps) {
                    if (protoProps) defineProperties(Constructor.prototype, protoProps);
                    if (staticProps) defineProperties(Constructor, staticProps);
                    return Constructor;
                };
            }();

            _export("Negociacao", Negociacao = function () {
                // atributos da classe
                function Negociacao(data, quantidade, valor) {
                    _classCallCheck(this, Negociacao);

                    // declarando parâmetros no constructor
                    this._data = new Date(data.getTime());
                    this._quantidade = quantidade;
                    this._valor = valor;
                    Object.freeze(this);
                }

                // métodos da classe


                _createClass(Negociacao, [{
                    key: "isEquals",
                    value: function isEquals(outraNegociacao) {
                        //JSON.stringify se baseia em todos os atributos
                        //return JSON.stringify(this) == JSON.stringify(outraNegociacao)

                        //negociação deve ser igual a outra quando apenas a data e o valor são iguais
                        return this._data.getTime() == outraNegociacao.data.getTime() && this._valor == outraNegociacao.valor;
                    }
                }, {
                    key: "volume",
                    get: function get() {
                        return this._quantidade * this._valor;
                    }
                }, {
                    key: "data",
                    get: function get() {
                        return new Date(this._data.getTime());
                    }
                }, {
                    key: "quantidade",
                    get: function get() {
                        return this._quantidade;
                    }
                }, {
                    key: "valor",
                    get: function get() {
                        return this._valor;
                    }
                }]);

                return Negociacao;
            }());

            _export("Negociacao", Negociacao);
        }
    };
});
//# sourceMappingURL=Negociacao.js.map