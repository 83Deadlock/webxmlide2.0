<template>
    <textarea ref="textarea"></textarea>
</template>

<script>
import CodeMirror from 'codemirror'
import 'codemirror/mode/dtd/dtd'
import 'codemirror/addon/fold/foldcode'
import 'codemirror/addon/fold/foldgutter'
import { mapState, mapMutations } from "vuex";

export default {
    name: 'DTDEditor',
    props: {
        dtdCode: {
            type: String,
            default: '',
        }
    },
    computed: mapState(["dtd_code"]),
    methods: mapMutations(["updateDTDCode"]),
    mounted() {
        const vm = this;

        const editorPromise = new Promise((resolve) => {
            const textarea = this.$refs.textarea
            const editor = CodeMirror.fromTextArea(textarea, {
                mode: "dtd",
                theme: "ayu-dark",
                lineNumbers: true,
                indentUnit: 2,
                smartIndent: true,
                foldGutter: true,
                lineWrapping: true,
                gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
                extraKeys: {
                    "Alt-I": function (cm) { cm.execCommand("indentAuto"); },
                },
            });

            resolve(editor);

            editor.setSize('100%', '100%');

            editor.setValue(this.dtd_code);
        })

        editorPromise.then((editor) => {
            editor.on('change', function () {
                const newContent = editor.getValue();
                vm.$store.commit('updateDTDCode', newContent);
            });            
        }).catch((error) => {
            console.error(error);
        });

        this.$watch('dtdCode', (newVal) => {
            if(editorPromise) {
                editorPromise.then((editor) => {
                    editor.setValue(newVal);
                }).catch((error) => {
                    console.error(error);
                })
            }
        })
    }
}

</script>