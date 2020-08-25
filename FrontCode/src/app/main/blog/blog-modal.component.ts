import { ModalDirective } from 'ngx-bootstrap';
import { NotifierService } from "angular-notifier";
import { Component, Output, ViewChild, EventEmitter } from '@angular/core';
import { BlogServiceProxy, BlogInfo } from 'src/app/shared/service-proxies/service-proxies';
import { AngularEditorConfig } from 'src/app/theme/shared/components/angular-editor/config';
@Component({
    selector: 'createOrEditBlogModal',
    templateUrl: './blog-modal.component.html'
})

export class CreateOrEditBlogModalComponent {
    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();
    saving = false;
    blog: BlogInfo;
    config: AngularEditorConfig = {
        editable: true,
        spellcheck: true,
        minHeight: '30rem',
        maxHeight: '100%',
        placeholder: 'Enter text here...',
        translate: 'no',
        sanitize: false,
        outline: true,
        defaultFontName: 'Comic Sans MS',
        defaultFontSize: '5',
        defaultParagraphSeparator: 'p',
        customClasses: [
            {
                name: 'quote',
                class: 'quote',
            },
            {
                name: 'redText',
                class: 'redText'
            },
            {
                name: 'titleText',
                class: 'titleText',
                tag: 'h1',
            },
        ],
        toolbarHiddenButtons: [
            ['bold', 'italic'],
            ['fontSize']
        ]
    };

    constructor(
        private notifier: NotifierService,
        private blogServiceProxy: BlogServiceProxy
    ) {
    }

    show(id: number) {
        if (id) {
            this.blogServiceProxy.getBlogById(id).subscribe(res => {
                this.blog = res;
            });
        } else {
            this.blog = new BlogInfo();
        }
        this.modal.show();
    }

    save() {
        this.blogServiceProxy.createOrUpdateBlog(this.blog).subscribe(res => {
            this.notifier.notify("success", "Action is successfull");
            this.modalSave.emit(null);
            this.close();
        });
    }

    close(): void {
        this.modal.hide();
    }
}