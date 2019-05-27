import { UIComponent } from "./UIComponent";
import { IBox } from "./IBox";
import { Event } from "../events/Event"
import { ILaya } from "ILaya";
	
	/**
	 * <code>Box</code> 类是一个控件容器类。
	 */
	export class Box extends UIComponent implements IBox {
		private _bgColor:string;
		
		/**@inheritDoc */
		/*override*/  set dataSource(value:any) {
			this._dataSource = value;
			for (var name  in value) {
				var comp:UIComponent = (<UIComponent>this.getChildByName(name) );
				if (comp) comp.dataSource = value[name];
				else if (this.hasOwnProperty(name) && !(this[name] instanceof Function)) this[name] = value[name];
			}
		}
        
        get dataSource(){
            return super.dataSource;
        }
        
		/**背景颜色*/
		 get bgColor():string {
			return this._bgColor;
		}
		
		 set bgColor(value:string) {
			this._bgColor = value;
			if (value) {
				this._onResize(null);
				this.on(Event.RESIZE, this, this._onResize);
			} else {
				this.graphics.clear();
				this.off(Event.RESIZE, this, this._onResize);
			}
		}
		
		private _onResize(e:Event):void {
			this.graphics.clear();
			this.graphics.drawRect(0, 0, this.width, this.height, this._bgColor);
		}
	}

ILaya.regClass(Box);    
