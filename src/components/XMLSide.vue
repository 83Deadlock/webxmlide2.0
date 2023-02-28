<template>
    <div class="xml-side">
        <div class="xml-top">
            <div class="xml-selector">
                <p id="xml-tag">XML</p>
                <i id="sep" class="fa-solid fa-chevron-right"></i>
                <input @blur="fileNameOnBlur" v-model="inputValue" ref="input" id="fileName" type="text" placeholder="Example.xml">
                <div v-if="hasError" class="error-icon" @mouseover="showErrorMessage">
                    <i class="fas fa-times"></i>
                    <div class="error-message" ref="errorMessage">File name should end with .xml</div>
                </div>
                <div v-else class="success-icon">
                    <i class="fas fa-check"></i>
                </div>
            </div>
            <div class="upload-download-buttons">
                <button id="upload_button" type="button"><i class="fas fa-upload"></i></button>
                <button id="download_button" type="button"><i class="fas fa-download"></i></button>
            </div>
            <!--Hidden file input to handle responding to the button click on the upload button-->
            <input type="file" id="file_input" style="display: none;">
        </div>
    </div>
      
</template>

<script>
    //import XMLEditor from './XMLEditor.vue'

    export default{
        name: 'XMLSide',
        data() {
            return {
                inputValue: '',
                errorMessageVisible: false,
            };
        },
        computed: {
            hasError() {
                return this.inputValue && !this.inputValue.endsWith('.xml') && this.inputValue.length > 0;
            },
        },
        components: {
        //    XMLEditor
        },
        methods: {
            fileNameOnBlur(){
                //this.selectionStart = this.selectionEnd = 0;
                const inputElement = this.$refs.input;

      // Set the cursor position to the beginning of the inserted value
                inputElement.setSelectionRange(0, 0);
            },
            showErrorMessage() {
                this.$refs.errorMessage.style.display = 'block';
            },
        }
    }
</script>

<style scoped>
.upload-download-buttons{
    display: flex;
    justify-content: flex-end;
    gap: 0px;
    align-items: center;
}

#upload_button, #download_button{
    background-color: transparent;
    border: none;
    color: #bbbbbb;
    transition: all 0.1s cubic-bezier(.25,.50,.75,1);
}

#upload_button:hover, #download_button:hover{
    color: #0092b2;
    cursor: pointer;
}

.xml-side {
    width: 50%;
    height: 100%;
    background-color: transparent;
    display: flex;
    flex-direction: column;
    background-color: transparent;
}

.xml-top{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding-top: 10px;
    padding-left: 30px;
    font-family: "Euclid";

}

.xml-selector{
    text-align: left;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 8px;
}

#sep, #xml-tag {
    color: #0092b2;
    font-weight: bold;
    vertical-align: baseline;
    font-size: 16px;
    cursor: default;
}

#fileName{
    background-color: transparent;
    border: none;
    color: #bbbbbb;
    vertical-align: middle;
    font-size: 16px;
    overflow: scroll;
    text-align: left;
    font-family: "Euclid";
    width: 180px;
}

#fileName:focus {
    outline: none; /* this will change the background color of the input when active */
    box-shadow: none; /* this will change the border color of the input when active */
}

.xml-middle{
    background-color: transparent;
    height: 60vh;
    padding-left: 30px;
}

.xml-bottom{
    display: flex;
    justify-content: space-between;
    padding-top: 0px;
    padding-left: 30px;
    font-family: "Euclid";
}

#xml-status{
    background-color: #111111;
    padding: 10px;
    border-radius: 30px;
    font-size: 16px;
    font-weight: 100;
    outline: 1px solid #0092b2;
    vertical-align: middle;
    padding-top: 15px;
    color: #0092b2;
    transition: all 0.1s cubic-bezier(.25,.50,.75,1);
}

#xml-status:hover{
    background-color: #0092b2;
    outline: 1px solid #111111;
    color: #111111;
}

#tip{
    font-size: 12px;
    color: #3c3c3c;
}


.error-icon,
.success-icon {
  position: relative;
  left: 0;
}

.error-icon:hover .error-message {
  display: block;
}

.error-message {
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  background-color: #c7c7c7;
  color: #111111;
  width: 140px;
  padding: 5px;
  border-radius: 5px;
  box-shadow: 6px 6px 6px rgba(0, 0, 0, 0.3);
}

.success-icon {
  color: #0092b2;
}

.error-icon{
    color: red;
}
</style>