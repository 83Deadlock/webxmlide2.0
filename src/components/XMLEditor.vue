<template>
    <textarea ref="textarea"></textarea>
</template>

<script>
import CodeMirror from 'codemirror'
import 'codemirror/mode/xml/xml'
import 'codemirror/addon/fold/foldcode'
import 'codemirror/addon/fold/foldgutter'
import 'codemirror/addon/fold/xml-fold'
import 'codemirror/addon/hint/show-hint'
import 'codemirror/addon/hint/xml-hint'
import { mapState, mapMutations } from "vuex";

export default {
    name: 'XMLEditor',
    components: {

    },
    data() {
        return {
            editor: null,
            content: ''
        }
    },
    computed: mapState(["xml_code"]),
    methods: {
        ...mapMutations(["updateXMLCode"]),
        updateContent(code) {
            this.content = code
            console.log("method updateContent -> " + this.content);
        },
    },
    mounted() {
        const vm = this;

        var tags = {
            "!top": ["root"],
            xml: null
        };

        function completeAfter(cm, pred) {
            if (!pred || pred()) setTimeout(function () {
                if (!cm.state.completionActive)
                    cm.showHint({ completeSingle: false });
            }, 100);
            return CodeMirror.Pass;
        }

        function completeIfAfterLt(cm) {
            return completeAfter(cm, function () {
                var cur = cm.getCursor();
                return cm.getRange(CodeMirror.Pos(cur.line, cur.ch - 1), cur) == "<";
            });
        }

        function completeIfInTag(cm) {
            return completeAfter(cm, function () {
                var tok = cm.getTokenAt(cm.getCursor());
                if (tok.type == "string" && (!/['"]/.test(tok.string.charAt(tok.string.length - 1)) || tok.string.length == 1)) return false;
                var inner = CodeMirror.innerMode(cm.getMode(), tok.state).state;
                return inner.tagName;
            });
        }

        function insertXMLDecl(cm) {
            var xmlDecl = '<?xml version="1.0" encoding="UTF-8"?>\n';
            var currentValue = cm.getValue();
            cm.setValue(xmlDecl + currentValue);
        }

        const editorPromise = new Promise((resolve) => {
            const textarea = this.$refs.textarea
            const editor = CodeMirror.fromTextArea(textarea, {
                mode: "xml",
                theme: "ayu-dark",
                lineNumbers: true,
                indentUnit: 2,
                smartIndent: true,
                foldGutter: true,
                gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
                extraKeys: {
                    "Ctrl-Q": function (cm) { cm.foldCode(cm.getCursor()); },
                    "Alt-X": insertXMLDecl,
                    "Ctrl-I": function (cm) { cm.execCommand("indentAuto"); },
                    "'<'": completeAfter,
                    "'/'": completeIfAfterLt,
                    "' '": completeIfInTag,
                    "'='": completeIfInTag,
                    "Ctrl-Space": function (cm) { cm.showHint({ completeSingle: false }); }
                },
                hintOptions: { schemaInfo: tags }
            });


            resolve(editor);


            editor.setSize('100%', '100%');
            //console.log(this.xml_code);

            editor.setValue(this.xml_code);

            console.log("resolved");
        })

        console.log("editor object: ", editorPromise)

        editorPromise.then((editor) => {
            console.log("inside then")
            editor.on('change', function () {
                const newContent = editor.getValue();
                vm.$store.commit('updateXMLCode', newContent);
                console.log("stored")
                //localStorage.setItem('xml_code', newContent);
            });
        }).catch((error) => {
            console.log("error")
            console.error(error);
        })

        console.log("test")


        //this.editor.on("change", () => { this.content = this.editor.getValue() })
    }
}
</script>

<style scoped>
textarea {
    text-align: left;
}
</style>
