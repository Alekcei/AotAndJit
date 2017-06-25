import { Component, OnInit, ViewContainerRef, ViewChild, ComponentRef, ElementRef, ComponentFactoryResolver, NgModule, Class } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { ControlsModule } from './controls/controls.module';
import { ReflectiveInjector, ComponentFactory, Compiler } from '@angular/core';
import { JitCompilerFactory } from '@angular/compiler';
import { CustomNgModule, CustomComponent } from './decorators.component';

export function appendMetaData(obj:any, metadata:any){
        obj.annotations = [ metadata ];
    }

export function createJitCompiler() {
    console.log("create jit compiller")
   return new JitCompilerFactory([{ useDebug: false, useJit: true}]).createCompiler();
}
class PetitionEdit{
    itIsMaySuperPetitionComponent = true
    selectFrom = {
      1:'value1 in dinmic petition',
      2:'value2 in dinamic petition',
      3:'value3 in dinmic petition',
      4:'value4 in dinamic petition',
      5:'value5 in dinmic petition',
      6:'value6 in dinamic petition',
      7:'value7 in dinmic petition',
      8:'value8 in dinamic petition',
      9:'value9 in dinmic petition',
      10:'value10 in dinamic petition',
      11:'value11 in dinmic petition',
      12:'value12 in dinamic petition',
      13:'value13 in dinmic petition',
      14:'value14 in dinamic petition'
    }
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

        try {

            let petitionhtmlForm = `
                <div style="text-align:center">
                  <h1 (click)="dinamicvar=123;">
                    Thih is my dinamic component does not work. Without  ControlsModule, {{dinamicvar}}
                  </h1>
                <br/>
                <br/><br/>
                 <ui-button>My button in dinamic component not working !</ui-button>
                <br/><br/>
                <ui-select style="width:300px" [from]="selectFrom"></ui-select>
                <br/><br/>
            `
            this.createDinamicPetitionComponent (petitionhtmlForm, this.innerRef3, this.containerRef3, this.resolver, this.compiler)

        } catch(e){
            console.error(e)
        }

    }

    createDinamicPetitionComponent(htmlForm, innerRef, containerRef, resolver, compiler ){
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
