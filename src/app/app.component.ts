import { Component, OnInit, ViewContainerRef, ViewChild, ComponentRef, ElementRef, ComponentFactoryResolver, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { ControlsModule } from './controls/controls.module';
import { ReflectiveInjector, ComponentFactory, Compiler } from '@angular/core';
import { JitCompilerFactory } from '@angular/compiler';

export function CustomComponent(annotation: any) {
  return function (target: Function) {
    //var parentTarget = annotation.parent;
    let metaData = new Component(annotation)
    Component(metaData)(target)
  }
}

export function CustomNgModule(annotation: any) {
  return function (target: Function) {
    //var parentTarget = annotation.parent;
    let metaData = new NgModule(annotation)
    NgModule(metaData)(target)
  }
}

export function appendMetaData(obj:any, metadata:any){
        obj.annotations = [ metadata ];
    }

export function createJitCompiler() {
    console.log("create jit compiller")
   return new JitCompilerFactory([{ useDebug: false, useJit: true}]).createCompiler();
}
class PetitionEdit{
    itIsMaySuperPetitionComponent = true
    selectFrom = {1:'value1 in dinmic petition', 2:'value2 in dinamic petition'}
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [{ provide: Compiler, useFactory: createJitCompiler, deps: [] }]
})
export class AppComponent implements OnInit {

    selectFrom = {1:'value1',2:'value2'}
    title = 'app';

    @ViewChild('petitionContent',  { read: ViewContainerRef })
    containerRef: ViewContainerRef;
    private innerRef: ComponentRef<any>;

    @ViewChild('petitionContentTwo',  { read: ViewContainerRef })
    containerRef2: ViewContainerRef;
    private innerRef2: ComponentRef<any>;

    @ViewChild('petitionContentThree',  { read: ViewContainerRef })
    containerRef3: ViewContainerRef;
    private innerRef3: ComponentRef<any>;

    constructor(private elementRef: ElementRef,
                private resolver: ComponentFactoryResolver,
                private compiler: Compiler){
    }
    ngOnInit() {

        try{
            let petitionhtmlForm = `
                <div style="text-align:center">
                  <h1>
                    Thih is my dinamic component
                  </h1>
                <br/>
                <ui-button>My button in dinamic component does not work !</ui-button>
                <br/><br/>
                <ui-select style="width:300px" [from]="selectFrom"></ui-select>
                <br/><br/>
            `
            this.createDinamicPetitionComponent1 (petitionhtmlForm, this.innerRef, this.containerRef, this.resolver, this.compiler)

        } catch(e){
            console.error(e)
        }
        try {

            let petitionhtmlForm = `
                <div style="text-align:center">
                  <h1>
                    Thih is my dinamic component WORKING. Without  ControlsModule, because ControlsModule does not contain MetaData
                  </h1>
                <br/>
                <br/><br/>
            `
            this.createDinamicPetitionComponent2 (petitionhtmlForm, this.innerRef2, this.containerRef2, this.resolver, this.compiler)

        } catch(e){
            console.error(e)
        }


        try {

            let petitionhtmlForm = `
                <div style="text-align:center">
                  <h1>
                    Thih is my dinamic component does not work. Without  ControlsModule,
                  </h1>
                <br/>
                <br/><br/>
                 <ui-button>My button in dinamic component not working !</ui-button>
                <br/><br/>
                <ui-select style="width:300px" [from]="selectFrom"></ui-select>
                <br/><br/>
            `
            this.createDinamicPetitionComponent3 (petitionhtmlForm, this.innerRef3, this.containerRef3, this.resolver, this.compiler)

        } catch(e){
            console.error(e)
        }

    }

    createDinamicPetitionComponent1(htmlForm, innerRef, containerRef, resolver, compiler ){
        console.log("createDinamicPetitionComponent1")
        if (innerRef) {
            innerRef.destroy();
        }

        @Component({
            selector: 'dinamic-petition-edit',
            template: htmlForm
        })
        class DynamicPetitionEditComponent extends PetitionEdit {}

        @NgModule({
            declarations:[DynamicPetitionEditComponent],
            imports: [    BrowserModule,
                          CommonModule,
                          ControlsModule
                     ]
        })
        class DynamicHtmlModule {}
        compiler.compileModuleAndAllComponentsAsync(DynamicHtmlModule) // if Aot no contains metadata
        .then(factory => {
            const compFactory = factory.componentFactories.find(x => x.componentType === DynamicPetitionEditComponent);
            const injector = ReflectiveInjector.fromResolvedProviders([], containerRef.parentInjector);
            innerRef = containerRef.createComponent(compFactory, 0, injector, []);
         });

    }

    createDinamicPetitionComponent2(htmlForm, innerRef, containerRef, resolver, compiler ){
        console.log("createDinamicPetitionComponent2")
        if (innerRef) {
            innerRef.destroy();
        }

        @CustomComponent({   //  custom append metaData
            selector: 'dinamic-petition-edit',
            template: htmlForm
        })
        class DynamicPetitionEditComponent extends PetitionEdit {}

        @CustomNgModule({
            declarations:[DynamicPetitionEditComponent],
            imports: [    BrowserModule,  // <-- succes
                          CommonModule,   // <-- succes
                        //  ControlsModule  // <-- HAS ERRORS
                     ]
        })
        class DynamicHtmlModule {}

        compiler.compileModuleAndAllComponentsAsync(DynamicHtmlModule)
        .then(factory => {
            const compFactory = factory.componentFactories.find(x => x.componentType === DynamicPetitionEditComponent);
            const injector = ReflectiveInjector.fromResolvedProviders([], containerRef.parentInjector);
            innerRef = containerRef.createComponent(compFactory, 0, injector, []);
         });

    }


    createDinamicPetitionComponent3(htmlForm, innerRef, containerRef, resolver, compiler ){
        console.log("createDinamicPetitionComponent3")
        if (innerRef) {
            innerRef.destroy();
        }

        @CustomComponent({   //  custom append metaData
            selector: 'dinamic-petition-edit',
            template: htmlForm
        })
        class DynamicPetitionEditComponent extends PetitionEdit {}

        @CustomNgModule({
            declarations:[DynamicPetitionEditComponent],
            imports: [    BrowserModule,  // <-- succes
                          CommonModule,   // <-- succes
                          ControlsModule  // <-- HAS ERRORS
                     ]
        })
        class DynamicHtmlModule {}

        compiler.compileModuleAndAllComponentsAsync(DynamicHtmlModule)
        .then(factory => {
            const compFactory = factory.componentFactories.find(x => x.componentType === DynamicPetitionEditComponent);
            const injector = ReflectiveInjector.fromResolvedProviders([], containerRef.parentInjector);
            innerRef = containerRef.createComponent(compFactory, 0, injector, []);
         });

    }
}
