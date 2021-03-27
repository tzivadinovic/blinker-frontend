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
  @ViewChild('boxNoRef') boxNoRef: ElementRef;
  @ViewChild('codeRef') codeRef: ElementRef;
  @ViewChild('descriptionRef') descriptionRef: ElementRef;
  @ViewChild('unitRef') unitRef: ElementRef;
  @ViewChild('quantityRef') quantityRef: ElementRef;
  @ViewChild('unitPriceRef') unitPriceRef: ElementRef;
  @ViewChild('totalPriceRef') totalPriceRef: ElementRef;

  @Input() inputs: InvoiceInputs;
  @Output() method: EventEmitter<any> = new EventEmitter<any>();
  @Output() inputEmitter: EventEmitter<InvoiceInputs> = new EventEmitter<InvoiceInputs>();

  form = new FormGroup({
    itemNo: new FormControl(null, [Validators.required]),
    boxNo: new FormControl(null, [Validators.required]),
    code: new FormControl(null, [Validators.required]),
    description: new FormControl(null, [Validators.required]),
    unit: new FormControl(null, [Validators.required]),
    quantity: new FormControl(null, [Validators.required]),
    unitPrice: new FormControl(null, [Validators.required]),
    totalPrice: new FormControl(null, [Validators.required])
  });
  @Input()
  itemNo = 1;
  boxNo = 1;
  code: string;
  description: string;
  unit: string;
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
    this.form.get('unit').setValue(this.unit);
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
      boxNo: this.boxNo,
      code: this.code,
      description: this.description,
      unit: this.unit,
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
        this.boxNoRef.nativeElement.focus();
        break;
      case 'boxNoRef':
        this.codeRef.nativeElement.focus();
        break;
      case 'codeRef':
        this.descriptionRef.nativeElement.focus();
        break;
      case 'descriptionRef':
        this.unitRef.nativeElement.focus();
        break;
      case 'unitRef':
        this.quantityRef.nativeElement.focus();
        break;
      case 'quantityRef':
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
    const boxNumber: number = this.form.get('boxNo').value;
    this.productService.findByCode(code).subscribe(data => {
      const productInvoice: ProductInvoice = {
        product: data,
        quantity: quantity,
        itemNumber: itemNumber,
        boxNumber: boxNumber
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
      this.form.get('unit').setValue(product.unit);
      this.form.get('unitPrice').setValue(product.price);
      this.form.get('totalPrice').setValue(this.form.get('quantity').value * product.price);
    }, error => {
      this.snackBarService.showErrorSnackbar(error.error.message);
    });
  }

  fillTotalPrice() {
    let product: Product = null;
    this.productService.findByCode(this.form.get('code').value).subscribe(data => {
      product = data;
      this.form.get('totalPrice').setValue(this.form.get('quantity').value * product.price);
    }, error => {
      this.snackBarService.showErrorSnackbar(error.error.message);
    });
  }
}
