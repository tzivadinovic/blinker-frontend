import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {InvoiceInputs} from '../../../../@types/InvoiceInputs';
import {Product, ProductControllerService, ProductInvoice, ProductInvoiceControllerService} from '../../../../openapi';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {SnackbarService} from '../../../../utils/snackbar-handler';

@Component({
  selector: 'app-new-invoice-fields',
  templateUrl: './new-invoice-fields.component.html',
  styleUrls: ['./new-invoice-fields.component.css']
})
export class NewInvoiceFieldsComponent implements OnInit, AfterViewInit {

  constructor(private productService: ProductControllerService,
              private snackBarService: SnackbarService,
              private productInvoiceService: ProductInvoiceControllerService) {
  }

  @ViewChild('itemNoRef') itemNoRef: ElementRef;
  @ViewChild('codeRef') codeRef: ElementRef;
  @ViewChild('descriptionRef') descriptionRef: ElementRef;
  @ViewChild('quantityRef') quantityRef: ElementRef;
  @ViewChild('unitPriceRef') unitPriceRef: ElementRef;
  @ViewChild('totalPriceRef') totalPriceRef: ElementRef;

  @Input()
  inputs: InvoiceInputs;

  @Input() test: string;

  @Output() method: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  inputEmitter: EventEmitter<InvoiceInputs> = new EventEmitter<InvoiceInputs>();

  form = new FormGroup({
    itemNo: new FormControl(null, [Validators.required]),
    code: new FormControl(null, [Validators.required]),
    description: new FormControl(null, [Validators.required]),
    quantity: new FormControl(null, [Validators.required]),
    unitPrice: new FormControl(null, [Validators.required]),
    totalPrice: new FormControl(null, [Validators.required])
  });
  @Input()
  itemNo = 1;
  code: string;
  description: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  invoiceInputs: any[] = [];

  products: Product[] = [];
  productInvoice: ProductInvoice;
  filteredProducts: Observable<Product[]>;


  ngOnInit(): void {
    this.getAllProducts();
    this.form.get('itemNo').setValue(this.itemNo);
    this.filteredProducts = this.form.get('code').valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  private _filter(value: string): Product[] {
    const filterValue = value.toLowerCase();
    return this.products.filter(product => product.code.toString().toLowerCase().startsWith(filterValue));
  }


  public inputEmit(): void {
    const form: InvoiceInputs = {
      itemNo: this.itemNo,
      code: this.code,
      description: this.description,
      quantity: this.quantity,
      unitPrice: this.unitPrice,
      totalPrice: this.totalPrice
    };
    this.inputEmitter.emit(form);
  }

  public checkForm(): void {
    const newInput: any = {};
    this.invoiceInputs.push(newInput);
    this.method.emit();
  }

  handleEnter(controlName: string): void {
    switch (controlName) {
      case 'itemNoRef':
        this.codeRef.nativeElement.focus();
        break;
      case 'codeRef':
        this.descriptionRef.nativeElement.focus();
        break;
      case 'descriptionRef':
        this.quantityRef.nativeElement.focus();
        break;
      case 'quantityRef':
        this.unitPriceRef.nativeElement.focus();
        break;
      case 'unitPriceRef':
        this.totalPriceRef.nativeElement.focus();
        break;
    }
  }

  ngAfterViewInit(): void {
    Promise.resolve().then(() => this.itemNoRef.nativeElement.focus());
  }

  getAllProducts(): void {
    this.productService.getAllProducts().subscribe(data => {
      this.products = data;
    });
  }

  saveProductInvoice() {
    const code: string = this.form.get('code').value;
    const quantity: number = this.form.get('quantity').value;
    const itemNumber: number = this.form.get('itemNo').value;
    this.productService.findByCode(code).subscribe(data => {
      const productInvoice: ProductInvoice = {
        product: data,
        quantity: quantity,
        itemNumber: itemNumber
      };
      this.productInvoiceService.saveProductInvoice(productInvoice).subscribe(() => {
        console.log(productInvoice);
      });
    });
  }


  fillOtherFieldsByCode() {
    let product: Product = null;
    this.productService.findByCode(this.form.get('code').value).subscribe(data => {
      product = data;
      this.form.get('description').setValue(product.description);
      this.form.get('unitPrice').setValue(product.price);
    }, error => {
      this.snackBarService.showErrorSnackbar(error.error.message);
    });
  }
}
